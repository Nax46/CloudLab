import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  unitId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema(
  {
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
