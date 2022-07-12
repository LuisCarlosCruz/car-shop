import Service, { ServiceError, Error } from '.';
import {
  Motorcycle, MotorcycleSchema } from '../interfaces/motorcycleInterface';
import { vehicleSchema } from '../interfaces/VehicleInterface';
import MotorcycleModel from '../models/motorcycleModel';

const errorMessage = 'Object not found';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (body: Motorcycle):
  Promise<Motorcycle | ServiceError | null> => {
    const valid = MotorcycleSchema.merge(vehicleSchema);
    const parsed = valid.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(body);
  };

  readOne = async (id: string): Promise<Motorcycle | null | Error> => {
    if (id.length < 24) return null;
    const motorcycle = await this.model.readOne(id);
    if (!motorcycle) return { error: 'defaultError' };
    return motorcycle;
  };

  update = async (id: string, body: Motorcycle):
  Promise<Motorcycle | ServiceError | null | Error> => {
    if (id.length < 24) return null;
    const valid = MotorcycleSchema.merge(vehicleSchema);
    const parsed = valid.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const motorcycle = await this.model.update(id, body);
    if (!motorcycle) return { error: 'defaultError' };
    return motorcycle;
  };

  delete = async (id: string): Promise<Motorcycle | null> => {
    if (id.length < 24) return null;
    const motorcycle = await this.model.delete(id);
    if (!motorcycle) throw new Error(errorMessage);
    return motorcycle;
  };
}

export default MotorcycleService;
