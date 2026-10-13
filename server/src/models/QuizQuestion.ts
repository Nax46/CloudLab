import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizQuestion extends Document {
  quizId: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizQuestionSchema: Schema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const QuizQuestion = mongoose.model<IQuizQuestion>('QuizQuestion', QuizQuestionSchema);
