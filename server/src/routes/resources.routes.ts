import { Router, Request, Response, NextFunction } from 'express';
import { LearningResource } from '../models/LearningResource.js';

const router = Router();

// GET /api/resources - List curated educational resources
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resources = await LearningResource.find().sort({ displayOrder: 1 }).lean();
    res.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
