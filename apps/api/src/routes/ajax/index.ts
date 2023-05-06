import express from 'express';
import apiKeys from './api-keys';
import auth from './auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/apikeys', apiKeys);

export default router;
