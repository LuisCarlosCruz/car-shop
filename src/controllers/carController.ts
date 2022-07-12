import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/carService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { body } = req;
    const cars = await this.service.create(body);
    if (cars && 'error' in cars) {
      return res.status(400).json(cars);
    } 
    return res.status(201).json(cars);
  };

  // readOne = async (
  //   req: Request<{ id: string; }>,
  //   res: Response<Car | ResponseError | null>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  //   const cars = await this.service.readOne(id);
  //   if (!cars) {
  //     return res.status(400).json({ error: this.errors.isIsNotValid });
  //   }
  //   if (cars && 'error' in cars) {
  //     return res.status(404).json({ error: this.errors.notFound });
  //   }
  //   return res.status(200).json(cars);
  // };

  // update = async (
  //   req: RequestWithBody<Car>,
  //   res: Response<Car | ResponseError | Error | null>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  //   const { body } = req;
  //   const car = await this.service.update(id, body);
  //   if (!car) {
  //     return res.status(400).json({ error: this.errors.isIsNotValid });
  //   }
  //   if ('error' in car && car.error === 'defaultError') {
  //     return res.status(404).json({ error: this.errors.notFound });
  //   }
  //   if ('error' in car) {
  //     return res.status(400).json(car);
  //   }
  //   return res.status(200).json(car);
  // };

  // delete = async (
  //   req: Request<{ id: string; }>,
  //   res: Response<Car | ResponseError>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  //   try {
  //     const car = await this.service.delete(id);
  //     return car
  //       ? res.status(204).send(car)
  //       : res.status(400).json({ error: this.errors.isIsNotValid });
  //   } catch (err) {
  //     return res.status(404).json({ error: this.errors.notFound });
  //   }
  // };
}

export default CarController;