import { Router, Request, Response, NextFunction } from 'express';
import { LabConfiguration } from '../models/LabConfiguration.js';
import { Unit } from '../models/Unit.js';

const router = Router();

// GET /api/labs - List all interactive lab configurations
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const labs = await LabConfiguration.find({ published: true }).sort({ displayOrder: 1 }).lean();

    const populatedLabs = await Promise.all(
      labs.map(async (lab) => {
        let unit = null;
        if (lab.unitId) {
          unit = await Unit.findById(lab.unitId).select('title slug unitNumber').lean();
        }
        return {
          ...lab,
          unit,
        };
      })
    );

    res.json({
      success: true,
      count: populatedLabs.length,
      data: populatedLabs,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/labs/:slug - Single lab by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await LabConfiguration.findOne({ slug: req.params.slug, published: true }).lean();
    if (!lab) {
      res.status(404).json({ success: false, error: 'NotFound', message: `Lab '${req.params.slug}' not found` });
      return;
    }

    let unit = null;
    if (lab.unitId) {
      unit = await Unit.findById(lab.unitId).select('title slug unitNumber').lean();
    }

    res.json({
      success: true,
      data: {
        ...lab,
        unit,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
