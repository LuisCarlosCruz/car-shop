import MongoModel from '.';
import { Motorcycle } from '../interfaces/motorcycleInterface';
import motorcycleSchemaModel from './schemas/motorcycleSchema';

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = motorcycleSchemaModel) {
    super(model);
  }
}
