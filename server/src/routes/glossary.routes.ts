import { Router, Request, Response, NextFunction } from 'express';
import { GlossaryTerm } from '../models/GlossaryTerm.js';

const router = Router();

// GET /api/glossary - Searchable terminology list
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    const filter: Record<string, any> = {};

    if (q && typeof q === 'string' && q.trim()) {
      filter.$or = [
        { term: { $regex: q.trim(), $options: 'i' } },
        { definition: { $regex: q.trim(), $options: 'i' } },
      ];
    }

    const terms = await GlossaryTerm.find(filter).sort({ term: 1 }).lean();

    res.json({
      success: true,
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
