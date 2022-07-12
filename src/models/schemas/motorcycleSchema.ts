import { Schema, model } from 'mongoose';
import { Motorcycle } from '../../interfaces/motorcycleInterface';

const motorcycleSchema = new Schema<Motorcycle>({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  buyValue: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  engineCapacity: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

const motorcycleSchemaModel = model<Motorcycle>('Motorcycle', motorcycleSchema);

export default motorcycleSchemaModel;