import express from 'express';
import status from 'http-status';
import ApiKey from 'lib/models/api-key';
import pick from 'lodash/pick';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth(), async (req, res, next) => {
  try {
    const apiKey = await ApiKey.create({
      name: req.body.name,
      user: res.locals.user.id,
      type: req.body.type,
    });

    res.send(apiKey.toJSON());
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth(), async (req, res, next) => {
  try {
    const apiKey = await ApiKey.findOneAndUpdate(
      {
        _id: req.params.id,
        user: res.locals.user.id,
      },
      pick(req.body, ['name']),
      { runValidators: true, new: true }
    );

    if (!apiKey) return res.sendStatus(status.NOT_FOUND);

    res.send(apiKey.toJSON());
  } catch (err) {
    next(err);
  }
});

router.post('/:id/roll', auth(), async (req, res, next) => {
  try {
    const apiKey = await ApiKey.findOne({
      _id: req.params.id,
      user: res.locals.user.id,
    });

    if (!apiKey) return res.sendStatus(status.NOT_FOUND);

    const rolledKey = await apiKey.roll();

    res.send(rolledKey.toJSON());
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth(), async (req, res, next) => {
  try {
    const apiKey = await ApiKey.findOne({
      _id: req.params.id,
      user: res.locals.user.id,
    });

    if (!apiKey) return res.sendStatus(status.NOT_FOUND);

    await apiKey.deleteOne();

    res.sendStatus(status.ACCEPTED);
  } catch (err) {
    next(err);
  }
});

router.get('/', auth(), async (req, res, next) => {
  try {
    const apiKeys = await ApiKey.paginate({
      ...req.query,
      user: res.locals.user.id,
    });

    res.send(apiKeys);
  } catch (err) {
    next(err);
  }
});

export default router;
