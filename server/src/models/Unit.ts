import mongoose, { Schema, Document } from 'mongoose';

export interface IUnit extends Document {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  unitNumber: number;
  learningObjectives: string[];
  estimatedMinutes: number;
  icon: string;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    unitNumber: { type: Number, required: true, unique: true },
    learningObjectives: { type: [String], default: [] },
    estimatedMinutes: { type: Number, default: 60 },
    icon: { type: String, default: 'Cloud' },
    published: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Unit = mongoose.model<IUnit>('Unit', UnitSchema);
