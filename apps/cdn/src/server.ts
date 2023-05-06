import express from 'express';
import status from 'http-status';
import { IBucket } from 'lib/models/bucket';
import File from 'lib/models/file';
import mongoose from 'lib/mongoose';
import storage from 'lib/storage';
import morgan from 'morgan';
import path from 'path';
import throng from 'throng';
import 'lib/models/bucket';

const port = parseInt(process.env.PORT || '5000', 10);
const dev = process.env.NODE_ENV !== 'production';

async function start() {
  const app = express();

  app.use(morgan(dev ? 'dev' : 'combined'));

  // Connect to MongoDB
  await mongoose.connect(process.env.DATABASE_URL!);

  app.set('trust proxy', !dev);
  app.disable('x-powered-by');

  app.get('/healthcheck', async (req, res) => {
    res.send('I am a content delivery teapot 🫖');
  });

  app.get('/:file', async (req, res) => {
    // Parse the file ID
    const { name: fileId } = path.parse(req.params.file);

    // Find the file
    const file = await File.findById(fileId).populate('bucket');
    if (!file) return res.sendStatus(status.NOT_FOUND);

    const bucket = file.bucket as IBucket;

    // If the file is restricted, ensure the hash matches
    if (file.restricted && req.query.authorization !== file.generateHash())
      return res.sendStatus(status.UNAUTHORIZED);

    // Construct a reference to the file in GCS
    const gcsFile = storage
      .bucket(bucket.slug)
      .file(`${file.id}${file.extension}`);
    if (!(await gcsFile.exists())[0]) return res.sendStatus(status.NOT_FOUND);

    // Cache
    res.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );

    // If no range header streaming, respond with the full file
    if (!req.headers.range) return gcsFile.createReadStream().pipe(res);

    // If a range header is present, calculate and send the proper range
    const [{ size, contentType }] = await gcsFile.getMetadata();
    const rangeStart = Number(req.headers.range.replace(/\D/g, ''));
    const rangeEnd = Math.min(rangeStart + 10 ** 6, size - 1);

    res.writeHead(206, {
      'Content-Range': `bytes ${rangeStart}-${rangeEnd}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': rangeEnd - rangeStart - 1,
      'Content-Type': contentType,
    });

    gcsFile.createReadStream({ start: rangeStart, end: rangeEnd }).pipe(res);
  });

  app.listen(port, () => console.log(`Listening on ${port}`));
}

throng({
  worker: start,
  count: parseInt(process.env.WEB_CONCURRENCY!, 10) || 1,
  lifetime: Infinity,
});
