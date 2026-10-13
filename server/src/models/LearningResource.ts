import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningResource extends Document {
  title: string;
  description: string;
  resourceType: 'Standard' | 'Textbook' | 'Documentation' | 'Whitepaper' | 'Tool';
  unitId?: mongoose.Types.ObjectId;
  url: string;
  provider: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const LearningResourceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    resourceType: {
      type: String,
      enum: ['Standard', 'Textbook', 'Documentation', 'Whitepaper', 'Tool'],
      required: true,
    },
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', index: true },
    url: { type: String, required: true },
    provider: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const LearningResource = mongoose.model<ILearningResource>('LearningResource', LearningResourceSchema);
