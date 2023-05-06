import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('There\'s no hole in my bucket 🪣');
});

export default router;
