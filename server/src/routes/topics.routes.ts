import { Router, Request, Response, NextFunction } from 'express';
import { Topic } from '../models/Topic.js';
import { Lesson } from '../models/Lesson.js';
import { Unit } from '../models/Unit.js';

const router = Router();

// GET /api/topics/:slug - Detailed topic page with lessons and parent unit info
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.slug, published: true }).lean();
    if (!topic) {
      res.status(404).json({ success: false, error: 'NotFound', message: `Topic '${req.params.slug}' not found` });
      return;
    }

    const unit = await Unit.findById(topic.unitId).lean();
    const lessons = await Lesson.find({ topicId: topic._id, published: true }).sort({ displayOrder: 1 }).lean();
    const siblingTopics = await Topic.find({ unitId: topic.unitId, published: true, _id: { $ne: topic._id } })
      .select('title slug shortDescription')
      .sort({ displayOrder: 1 })
      .lean();

    res.json({
      success: true,
      data: {
        ...topic,
        unit,
        lessons,
        relatedTopics: siblingTopics,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
