import { Router, Request, Response, NextFunction } from 'express';
import { Unit } from '../models/Unit.js';
import { Topic } from '../models/Topic.js';
import { Lesson } from '../models/Lesson.js';
import { GlossaryTerm } from '../models/GlossaryTerm.js';

const router = Router();

// GET /api/search?q=... - Global search across units, topics, lessons, and glossary
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';

    if (!query || query.length < 2) {
      res.json({
        success: true,
        query,
        results: {
          units: [],
          topics: [],
          lessons: [],
          glossary: [],
        },
      });
      return;
    }

    const regex = new RegExp(query, 'i');

    const [units, topics, lessons, glossary] = await Promise.all([
      Unit.find({
        published: true,
        $or: [{ title: regex }, { shortDescription: regex }, { description: regex }],
      })
        .select('title slug shortDescription unitNumber')
        .limit(5)
        .lean(),

      Topic.find({
        published: true,
        $or: [{ title: regex }, { shortDescription: regex }, { content: regex }],
      })
        .select('title slug shortDescription unitId')
        .limit(8)
        .lean(),

      Lesson.find({
        published: true,
        $or: [{ title: regex }, { introduction: regex }, { content: regex }],
      })
        .select('title topicId summary')
        .limit(5)
        .lean(),

      GlossaryTerm.find({
        $or: [{ term: regex }, { definition: regex }],
      })
        .select('term definition')
        .limit(6)
        .lean(),
    ]);

    res.json({
      success: true,
      query,
      results: {
        units,
        topics,
        lessons,
        glossary,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
