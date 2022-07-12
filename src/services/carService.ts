import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { ServiceError, Error } from '.';
import CarModel from '../models/carModel';
import { vehicleSchema } from '../interfaces/VehicleInterface';

// const errorMessage = 'Object not found';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (body: Car): Promise<Car | ServiceError | null> => {
    const valid = CarSchema.merge(vehicleSchema);
    const parsed = valid.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(body);
  };

  readOne = async (id: string): Promise<Car | Error | null> => {
    if (id.length < 24) return null;
    const car = await this.model.readOne(id);
    if (!car) return { error: 'defaultError' };
    return car;
  };

  // update = async (id: string, body: Car):
  // Promise<Car | ServiceError | Error | null> => {
  //   if (id.length < 24) return null;
  //   const valid = CarSchema.merge(VehicleSchema);
  //   const parsed = valid.safeParse(body);
  //   if (!parsed.success) {
  //     return { error: parsed.error };
  //   }
  //   const car = await this.model.update(id, body);
  //   if (!car) return { error: 'defaultError' };
  //   return car;
  // };

  // delete = async (id: string): Promise<Car | null> => {
  //   if (id.length < 24) return null;
  //   const car = await this.model.delete(id);
  //   if (!car) throw new Error(errorMessage);
  //   return car;
  // };
}

export default CarService;
