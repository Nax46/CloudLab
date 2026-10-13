import { Router, Request, Response, NextFunction } from 'express';
import { CaseStudy } from '../models/CaseStudy.js';

const router = Router();

// GET /api/case-studies - List all educational case studies
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studies = await CaseStudy.find().sort({ displayOrder: 1 }).lean();
    res.json({
      success: true,
      count: studies.length,
      data: studies,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
