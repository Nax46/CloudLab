import { Router, Request, Response } from 'express';
import { isDbConnected } from '../config/db.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const dbConnected = isDbConnected();

  res.status(200).json({
    success: true,
    status: dbConnected ? 'healthy' : 'degraded',
    platform: 'CloudLab - FCC Educational Platform',
    database: dbConnected ? 'connected' : 'disconnected',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    message: dbConnected
      ? 'MongoDB Atlas connection active and serving dynamic educational content.'
      : 'MongoDB Atlas is disconnected. Fallback to Local Demo mode is recommended.',
  });
});

export default router;
