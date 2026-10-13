import { Router, Request, Response, NextFunction } from 'express';
import { Unit } from '../models/Unit.js';
import { Topic } from '../models/Topic.js';
import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { QuizQuestion } from '../models/QuizQuestion.js';
import { LabConfiguration } from '../models/LabConfiguration.js';

const router = Router();

// GET /api/units - List all published units with topic count
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const units = await Unit.find({ published: true }).sort({ displayOrder: 1, unitNumber: 1 }).lean();

    // Attach topic counts
    const unitsWithCounts = await Promise.all(
      units.map(async (u) => {
        const topicCount = await Topic.countDocuments({ unitId: u._id, published: true });
        return {
          ...u,
          topicCount,
        };
      })
    );

    res.json({
      success: true,
      count: unitsWithCounts.length,
      data: unitsWithCounts,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/units/:slug - Get single unit with topics, lessons, associated labs, and quiz
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const unit = await Unit.findOne({ slug: req.params.slug, published: true }).lean();
    if (!unit) {
      res.status(404).json({ success: false, error: 'NotFound', message: `Unit '${req.params.slug}' not found` });
      return;
    }

    // Fetch topics with their lessons
    const topics = await Topic.find({ unitId: unit._id, published: true }).sort({ displayOrder: 1 }).lean();
    const topicsWithLessons = await Promise.all(
      topics.map(async (t) => {
        const lessons = await Lesson.find({ topicId: t._id, published: true }).sort({ displayOrder: 1 }).lean();
        return {
          ...t,
          lessons,
        };
      })
    );

    // Fetch associated labs
    const labs = await LabConfiguration.find({ unitId: unit._id, published: true }).sort({ displayOrder: 1 }).lean();

    // Fetch quiz for this unit
    const quiz = await Quiz.findOne({ unitId: unit._id, published: true }).lean();
    let quizWithQuestions = null;
    if (quiz) {
      const questions = await QuizQuestion.find({ quizId: quiz._id }).sort({ displayOrder: 1 }).lean();
      quizWithQuestions = {
        ...quiz,
        questions,
      };
    }

    res.json({
      success: true,
      data: {
        ...unit,
        topics: topicsWithLessons,
        labs,
        quiz: quizWithQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
