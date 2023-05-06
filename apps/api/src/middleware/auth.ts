import basicAuth from 'basic-auth';
import { RequestHandler } from 'express';
import status from 'http-status';
import ApiKey from 'lib/models/api-key';
import Token from 'lib/models/token';
import { IUser } from 'lib/models/user';

export default function auth(secure = false, admin = false) {
  const authHandler: RequestHandler = async (req, res, next) => {
    if (req.cookies.authorization) {
      // Fetch relevant token
      const token = await Token.findById(req.cookies.authorization).populate<{
        user: IUser;
      }>('user');

      // Reject if authorization token not found
      if (!token) return res.sendStatus(status.UNAUTHORIZED);

      // Reject is route requires admin access and user is not admin
      if (admin && !token.user.admin)
        return res.sendStatus(status.UNAUTHORIZED);

      // Set locals
      res.locals.user = token.user;

      next();
    } else {
      // Parse bearer token from authorization header
      const credentials = basicAuth(req);
      const bearerToken =
        /^ *[Bb][Ee][Aa][Rr][Ee][Rr] +([A-Za-z0-9_-]+) *$/.test(
          req.get('Authorization') || ''
        ) && req.get('Authorization')?.split(' ')[1];

      // Reject if bearer token not found in authorization header
      if (!credentials && !bearerToken) {
        return res.status(status.UNAUTHORIZED).send({
          error: {
            message:
              "You did not provide an API key. You need to provide your API key in the Authorization header, using Bearer auth (e.g. 'Authorization: Bearer YOUR_API_KEY').",
            type: 'invalid_request_error',
          },
        });
      }

      const apiKey = await ApiKey.findOneAndUpdate(
        {
          $or: [
            ...(credentials ? [{ key: credentials.name }] : []),
            ...(bearerToken ? [{ key: bearerToken }] : []),
          ],
        },
        {
          last_used: Date.now(),
        }
      ).populate<{ user: IUser }>('user');

      // Reject if no API key found
      if (!apiKey) {
        return res.status(status.UNAUTHORIZED).send({
          error: {
            message: 'Invalid API key provided',
            type: 'invalid_request_error',
          },
        });
      }

      // Reject if API key has the wrong access level
      if (secure && apiKey.type !== 'secret')
        return res.sendStatus(status.UNAUTHORIZED);

      // Reject is route requires admin access and user is not admin
      if (admin && !apiKey.user.admin)
        return res.sendStatus(status.UNAUTHORIZED);

      res.locals.apiKey = apiKey;
      res.locals.user = apiKey.user;

      next();
    }
  };

  return authHandler;
}
