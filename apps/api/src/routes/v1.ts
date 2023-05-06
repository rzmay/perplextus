import express from 'express';
import buckets from '../controllers/buckets';
import files from '../controllers/files';
import auth from '../middleware/auth';
import parseFormdata from '../middleware/parse-formdata';
import upload from '../middleware/upload';

const router = express.Router();

// Buckets
router.post('/buckets', auth(true), (req, res, next) => buckets.create(req, res, next));
router.get('/buckets/:id', auth(true), (req, res, next) => buckets.retrieve(req, res, next));
router.get('/buckets', auth(true), (req, res, next) => buckets.list(req, res, next));
router.patch('/buckets/:id', auth(true), (req, res, next) => {
  buckets.update(req, res, next);
});
router.delete('/buckets/:id', auth(true), (req, res, next) => buckets.delete(req, res, next));

// Files
router.post('/files', auth(false), parseFormdata, upload, (req, res, next) => files.create(req, res, next));
router.get('/files/:id', auth(true), (req, res, next) => files.retrieve(req, res, next));
router.get('/files', auth(true), (req, res, next) => files.list(req, res, next));
router.delete('/files/:id', auth(true), (req, res, next) => files.delete(req, res, next));

export default router;
