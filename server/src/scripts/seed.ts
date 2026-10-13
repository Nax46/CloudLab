import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Unit } from '../models/Unit.js';
import { Topic } from '../models/Topic.js';
import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { QuizQuestion } from '../models/QuizQuestion.js';
import { LabConfiguration } from '../models/LabConfiguration.js';
import { CloudProvider } from '../models/CloudProvider.js';
import { CaseStudy } from '../models/CaseStudy.js';
import { GlossaryTerm } from '../models/GlossaryTerm.js';
import { LearningResource } from '../models/LearningResource.js';

import {
  unitsData,
  topicsData,
  lessonsData,
  quizzesData,
  labConfigurationsData,
  cloudProvidersData,
  caseStudiesData,
  glossaryTermsData,
  learningResourcesData,
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const rawUri = process.env.MONGODB_URI;

export async function runSeed(exitOnComplete = true) {
  console.log('----------------------------------------------------');
  console.log('⚡ Starting CloudLab Database Seeding (Idempotent)...');

  if (!rawUri || rawUri.includes('PASTE_YOUR_MONGODB') || (!rawUri.startsWith('mongodb://') && !rawUri.startsWith('mongodb+srv://'))) {
    console.error('❌ MONGODB_URI is not configured in server/.env.');
    console.error('👉 Open server/.env and replace PASTE_YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE with your MongoDB connection string.');
    console.error('Example: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cloudlab?retryWrites=true&w=majority');
    if (exitOnComplete) process.exit(1);
    return;
  }

  const MONGODB_URI = rawUri;
  console.log(`📡 Connecting to MongoDB: ${MONGODB_URI.replace(/:([^@]+)@/, ':****@')}`);

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
    console.log('✅ Connected to MongoDB successfully.');

    // 1. Seed Units
    console.log('📦 Seeding Units...');
    const unitMap = new Map<string, mongoose.Types.ObjectId>();
    for (const u of unitsData) {
      const doc = await Unit.findOneAndUpdate(
        { slug: u.slug },
        {
          $set: {
            title: u.title,
            shortDescription: u.shortDescription,
            description: u.description,
            unitNumber: u.unitNumber,
            learningObjectives: u.learningObjectives,
            estimatedMinutes: u.estimatedMinutes,
            icon: u.icon,
            published: true,
            displayOrder: u.displayOrder,
          },
        },
        { upsert: true, new: true }
      );
      unitMap.set(u.slug, doc._id as mongoose.Types.ObjectId);
    }
    console.log(`✅ Seeded ${unitMap.size} Units.`);

    // 2. Seed Topics
    console.log('📚 Seeding Topics...');
    const topicMap = new Map<string, mongoose.Types.ObjectId>();
    for (const t of topicsData) {
      const unitId = unitMap.get(t.unitSlug);
      if (!unitId) continue;

      const doc = await Topic.findOneAndUpdate(
        { slug: t.slug },
        {
          $set: {
            unitId,
            title: t.title,
            shortDescription: t.shortDescription,
            content: t.content,
            keyPoints: t.keyPoints,
            realWorldExample: t.realWorldExample,
            displayOrder: t.displayOrder,
            published: true,
          },
        },
        { upsert: true, new: true }
      );
      topicMap.set(t.slug, doc._id as mongoose.Types.ObjectId);
    }
    console.log(`✅ Seeded ${topicMap.size} Topics.`);

    // 3. Seed Lessons
    console.log('📝 Seeding Lessons...');
    let lessonCount = 0;
    for (const l of lessonsData) {
      const topicId = topicMap.get(l.topicSlug);
      if (!topicId) continue;

      await Lesson.findOneAndUpdate(
        { topicId, title: l.title },
        {
          $set: {
            introduction: l.introduction,
            content: l.content,
            practicalExample: l.practicalExample,
            summary: l.summary,
            displayOrder: l.displayOrder,
            published: true,
          },
        },
        { upsert: true, new: true }
      );
      lessonCount++;
    }
    console.log(`✅ Seeded ${lessonCount} Lessons.`);

    // 4. Seed Quizzes & Questions
    console.log('❓ Seeding Quizzes & Questions...');
    let questionCount = 0;
    for (const q of quizzesData) {
      const unitId = unitMap.get(q.unitSlug);
      if (!unitId) continue;

      const quizDoc = await Quiz.findOneAndUpdate(
        { unitId, title: q.title },
        {
          $set: {
            description: q.description,
            published: true,
          },
        },
        { upsert: true, new: true }
      );

      // Remove existing questions for this quiz to keep in sync cleanly
      await QuizQuestion.deleteMany({ quizId: quizDoc._id });

      for (const qq of q.questions) {
        await QuizQuestion.create({
          quizId: quizDoc._id,
          question: qq.question,
          options: qq.options,
          correctAnswer: qq.correctAnswer,
          explanation: qq.explanation,
          difficulty: qq.difficulty,
          displayOrder: qq.displayOrder,
        });
        questionCount++;
      }
    }
    console.log(`✅ Seeded ${quizzesData.length} Quizzes with ${questionCount} Questions.`);

    // 5. Seed Lab Configurations
    console.log('🔬 Seeding Lab Configurations...');
    for (const lab of labConfigurationsData) {
      const unitId = lab.unitSlug ? unitMap.get(lab.unitSlug) : undefined;
      await LabConfiguration.findOneAndUpdate(
        { slug: lab.slug },
        {
          $set: {
            unitId,
            title: lab.title,
            description: lab.description,
            configuration: lab.configuration,
            labType: lab.labType,
            displayOrder: lab.displayOrder,
            published: true,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${labConfigurationsData.length} Lab Configurations.`);

    // 6. Seed Cloud Providers
    console.log('☁️ Seeding Cloud Providers...');
    for (const p of cloudProvidersData) {
      await CloudProvider.findOneAndUpdate(
        { name: p.name },
        {
          $set: {
            description: p.description,
            serviceCategories: p.serviceCategories,
            officialWebsite: p.officialWebsite,
            displayOrder: p.displayOrder,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${cloudProvidersData.length} Cloud Providers.`);

    // 7. Seed Case Studies
    console.log('🏢 Seeding Case Studies...');
    for (const cs of caseStudiesData) {
      await CaseStudy.findOneAndUpdate(
        { title: cs.title },
        {
          $set: {
            organization: cs.organization,
            cloudConcepts: cs.cloudConcepts,
            description: cs.description,
            lessonsLearned: cs.lessonsLearned,
            sourceUrl: cs.sourceUrl,
            displayOrder: cs.displayOrder,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${caseStudiesData.length} Case Studies.`);

    // 8. Seed Glossary Terms
    console.log('📖 Seeding Glossary Terms...');
    for (const gt of glossaryTermsData) {
      await GlossaryTerm.findOneAndUpdate(
        { term: gt.term },
        {
          $set: {
            definition: gt.definition,
            displayOrder: gt.displayOrder,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${glossaryTermsData.length} Glossary Terms.`);

    // 9. Seed Learning Resources
    console.log('📚 Seeding Learning Resources...');
    for (const r of learningResourcesData) {
      await LearningResource.findOneAndUpdate(
        { title: r.title },
        {
          $set: {
            description: r.description,
            resourceType: r.resourceType,
            url: r.url,
            provider: r.provider,
            displayOrder: r.displayOrder,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${learningResourcesData.length} Learning Resources.`);

    console.log('🎉 Seeding successfully completed without duplicate records!');
    console.log('----------------------------------------------------');

    if (exitOnComplete) {
      await mongoose.disconnect();
      process.exit(0);
    }
  } catch (err) {
    console.error('❌ Seeding failed with error:', err);
    if (exitOnComplete) {
      process.exit(1);
    }
    throw err;
  }
}

// Run directly if invoked as script
const isMainModule = process.argv[1] && process.argv[1].endsWith('seed.ts');
if (isMainModule) {
  runSeed(true);
}
