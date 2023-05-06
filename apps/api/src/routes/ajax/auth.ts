import express from 'express';
import status from 'http-status';
import Token from 'lib/models/token';
import User, { IUser } from 'lib/models/user';
import resend from 'lib/resend';
import passport from '../../lib/passport';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/login/email', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) user = await User.create({ email: req.body.email });

    const token = await Token.create({ user: user.id, strategy: 'email' });

    const loginLink = token.getLoginLink(
      req.query.redirect?.toString() || '/dashboard'
    );

    await resend.sendEmail({
      from: 'Bucket <support@hyper.co>',
      to: req.body.email,
      subject: 'Log in to Zippin',
      html: `
        <div>
          Your login link for Zippin
          <br /><br />
          <a href="${loginLink}">Continue to Zippin</a>
          <br /><br />
          This link and code will only be valid for the next 5 minutes. If the link
          does not work, contact support at support@hyper.co.
        </div>
      `,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get('/login/google', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
    state: JSON.stringify({
      redirect: req.query.redirect?.toString(),
    }),
  })(req, res, next);
});

router.get(
  '/login/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.DASHBOARD_BASE_URL}/login`,
  }),
  async (req, res, next) => {
    try {
      const state = req.query.state && JSON.parse(req.query.state.toString());
      const user = req.user as IUser;
      if (!user) return res.redirect(`${process.env.DASHBOARD_BASE_URL}/login`);

      const token = await Token.create({ user: user.id, strategy: 'google' });

      const loginLink = new URL(`${process.env.DASHBOARD_BASE_URL}/login`);
      loginLink.searchParams.append('token', token.id);
      loginLink.searchParams.append(
        'redirect',
        encodeURIComponent(state.redirect?.toString() || '/dashboard')
      );

      res.redirect(loginLink.toString());
    } catch (err) {
      next(err);
    }
  }
);

router.post('/recycle', async (req, res, next) => {
  try {
    const oldToken = await Token.findById(req.body.authorization);
    if (!oldToken) return res.sendStatus(status.UNAUTHORIZED);

    const newToken = await Token.create({
      user: oldToken.user,
      strategy: oldToken.strategy,
    });

    await User.findByIdAndUpdate(oldToken.user, { last_login: Date.now() });
    await oldToken.deleteOne();

    res.send({ authorization: newToken.id });
  } catch (err) {
    next(err);
  }
});

router.get('/user', auth(), async (req, res) => {
  res.send(res.locals.user);
});

export default router;
