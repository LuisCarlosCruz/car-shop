import MongoModel from '.';
import { Car } from '../interfaces/CarInterface';
import carSchemaModel from './schemas/carSchema';

export default class CarModel extends MongoModel<Car> {
  constructor(model = carSchemaModel) {
    super(model);
  }
}