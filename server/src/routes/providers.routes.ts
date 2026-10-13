import { Router, Request, Response, NextFunction } from 'express';
import { CloudProvider } from '../models/CloudProvider.js';

const router = Router();

// GET /api/providers - List all cloud providers (AWS, Azure, GCP)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providers = await CloudProvider.find().sort({ displayOrder: 1 }).lean();
    res.json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
