import mongoose, { Schema, Document } from 'mongoose';

export interface IProviderService {
  name: string;
  description: string;
  useCase: string;
}

export interface IProviderCategory {
  category: string;
  services: IProviderService[];
}

export interface ICloudProvider extends Document {
  name: string;
  description: string;
  serviceCategories: IProviderCategory[];
  officialWebsite: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    services: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        useCase: { type: String, required: true },
      },
    ],
  },
  { _id: false }
);

const CloudProviderSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    serviceCategories: { type: [ServiceCategorySchema], default: [] },
    officialWebsite: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CloudProvider = mongoose.model<ICloudProvider>('CloudProvider', CloudProviderSchema);
