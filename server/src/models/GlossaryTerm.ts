import mongoose, { Schema, Document } from 'mongoose';

export interface IGlossaryTerm extends Document {
  term: string;
  definition: string;
  relatedUnitId?: mongoose.Types.ObjectId;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GlossaryTermSchema: Schema = new Schema(
  {
    term: { type: String, required: true, unique: true, index: true },
    definition: { type: String, required: true },
    relatedUnitId: { type: Schema.Types.ObjectId, ref: 'Unit', index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GlossaryTerm = mongoose.model<IGlossaryTerm>('GlossaryTerm', GlossaryTermSchema);
