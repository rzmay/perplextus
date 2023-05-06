import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import Bucket from 'lib/models/bucket';
import MulterGCS from 'lib/multer-gcs';
import multer from 'multer';

export async function upload(req: Request, res: Response, next: NextFunction) {
  const bucket = await Bucket.findOne({
    user: res.locals.user.id,
    name: req.query.bucket || 'default',
  });

  if (!bucket) return res.sendStatus(status.BAD_REQUEST);

  res.locals.bucket = bucket;

  return multer({
    storage: new MulterGCS(bucket),
    limits: {
      fileSize: bucket.settings.size_limit || Infinity,
    },
    fileFilter: (req, file, cb) => {
      if (!bucket.validateMimeType(file.mimetype)) return cb(null, false);

      return cb(null, true);
    },
  }).single('file')(req, res, next);
}

export default upload;
