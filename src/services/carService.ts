import { ZodError } from 'zod';
import Service from './index';
import CarModel, { CarDocument } from '../models/carModel';
import { carSchema } from '../interfaces/CarInterface';

export interface ServiceError {
  error: ZodError;
}

class CarsService extends Service<CarDocument> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (
    objeto: CarDocument,
  ): Promise<CarDocument | ServiceError | null> => {
    const carCreated = carSchema.safeParse(objeto);

    if (!carCreated.success) return { error: carCreated.error };

    return this.model.create(objeto);
  };
}

export default CarsService;