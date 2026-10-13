import mongoose, { Schema, Document } from 'mongoose';

export interface ILabConfiguration extends Document {
  unitId?: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  description: string;
  configuration: Record<string, any>;
  labType: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LabConfigurationSchema: Schema = new Schema(
  {
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    configuration: { type: Schema.Types.Mixed, default: {} },
    labType: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const LabConfiguration = mongoose.model<ILabConfiguration>('LabConfiguration', LabConfigurationSchema);
