import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  unitId: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  keyPoints: string[];
  realWorldExample: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema = new Schema(
  {
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    keyPoints: { type: [String], default: [] },
    realWorldExample: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Topic = mongoose.model<ITopic>('Topic', TopicSchema);
