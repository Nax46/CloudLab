import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  topicId: mongoose.Types.ObjectId;
  title: string;
  introduction: string;
  content: string;
  practicalExample: string;
  summary: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema: Schema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true, index: true },
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    content: { type: String, required: true },
    practicalExample: { type: String, required: true },
    summary: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);
