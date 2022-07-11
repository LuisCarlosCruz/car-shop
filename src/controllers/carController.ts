import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './index';
import CarsService from '../services/carService';
import { CarDocument } from '../models/carModel';

export default class CarController extends Controller<CarDocument> {
  private $route: string;

  constructor(
    service = new CarsService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<CarDocument>,
    res: Response<CarDocument | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    const car = await this.service.create(body);

    if (!car) return res.status(500).json({ error: this.errors.internal });

    if ('error' in car) return res.status(400).json(car);

    return res.status(201).send(car);
  };
}
