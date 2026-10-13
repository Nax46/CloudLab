import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  organization: string;
  cloudConcepts: string[];
  description: string;
  lessonsLearned: string[];
  sourceUrl?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    cloudConcepts: { type: [String], default: [] },
    description: { type: String, required: true },
    lessonsLearned: { type: [String], default: [] },
    sourceUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CaseStudy = mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
