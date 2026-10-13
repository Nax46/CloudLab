import { Router, Request, Response, NextFunction } from 'express';
import { Quiz } from '../models/Quiz.js';
import { QuizQuestion } from '../models/QuizQuestion.js';
import { Unit } from '../models/Unit.js';

const router = Router();

// GET /api/quizzes - List all published quizzes with question counts and unit info
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizzes = await Quiz.find({ published: true }).lean();

    const quizzesWithDetails = await Promise.all(
      quizzes.map(async (q) => {
        const unit = await Unit.findById(q.unitId).select('title slug unitNumber').lean();
        const questionCount = await QuizQuestion.countDocuments({ quizId: q._id });
        return {
          ...q,
          unit,
          questionCount,
        };
      })
    );

    res.json({
      success: true,
      count: quizzesWithDetails.length,
      data: quizzesWithDetails,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/quizzes/unit/:unitSlug - Fetch quiz for a unit with all its questions
router.get('/unit/:unitSlug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const unit = await Unit.findOne({ slug: req.params.unitSlug, published: true }).lean();
    if (!unit) {
      res.status(404).json({ success: false, error: 'NotFound', message: `Unit '${req.params.unitSlug}' not found` });
      return;
    }

    const quiz = await Quiz.findOne({ unitId: unit._id, published: true }).lean();
    if (!quiz) {
      res.status(404).json({ success: false, error: 'NotFound', message: `Quiz for unit '${req.params.unitSlug}' not found` });
      return;
    }

    const questions = await QuizQuestion.find({ quizId: quiz._id }).sort({ displayOrder: 1 }).lean();

    res.json({
      success: true,
      data: {
        ...quiz,
        unit,
        questions,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/quizzes/:id - Fetch single quiz with its questions
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();
    if (!quiz) {
      res.status(404).json({ success: false, error: 'NotFound', message: 'Quiz not found' });
      return;
    }

    const unit = await Unit.findById(quiz.unitId).select('title slug unitNumber').lean();
    const questions = await QuizQuestion.find({ quizId: quiz._id }).sort({ displayOrder: 1 }).lean();

    res.json({
      success: true,
      data: {
        ...quiz,
        unit,
        questions,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
