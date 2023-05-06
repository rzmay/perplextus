import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export async function parseFormdata(req: Request, res: Response, next: NextFunction) {
  return multer({
    fileFilter: (req, file, cb) => { return cb(null, false); },
  }).any()(req, res, next);
}

export default parseFormdata;
