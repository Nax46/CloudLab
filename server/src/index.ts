import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { enforceReadOnly } from './middleware/readOnly.js';
import { errorHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/health.routes.js';
import unitsRoutes from './routes/units.routes.js';
import topicsRoutes from './routes/topics.routes.js';
import labsRoutes from './routes/labs.routes.js';
import quizzesRoutes from './routes/quizzes.routes.js';
import providersRoutes from './routes/providers.routes.js';
import caseStudiesRoutes from './routes/caseStudies.routes.js';
import glossaryRoutes from './routes/glossary.routes.js';
import resourcesRoutes from './routes/resources.routes.js';
import searchRoutes from './routes/search.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback to local server/.env

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(helmet());
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for public educational read-only API access
      }
    },
    methods: ['GET', 'HEAD', 'OPTIONS'],
    credentials: true,
  })
);

// Rate Limiter: 300 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    success: false,
    error: 'TooManyRequests',
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Enforce read-only for public access
app.use('/api', enforceReadOnly);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/units', unitsRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/labs', labsRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/case-studies', caseStudiesRoutes);
app.use('/api/glossary', glossaryRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/search', searchRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'CloudLab API',
    description: 'Fundamental of Cloud Computing (FCC) Educational REST API',
    documentation: '/api/health',
    version: '1.0.0',
    mode: 'public-read-only',
  });
});

// Centralized error handler
app.use(errorHandler);

// Connect to MongoDB and start server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 CloudLab Express Server running on port ${PORT}`);
    console.log(`🔗 Health check available at: http://localhost:${PORT}/api/health`);
    console.log(`📚 Syllabus Units endpoint: http://localhost:${PORT}/api/units`);
  });
}

// Start if not in test suite
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
