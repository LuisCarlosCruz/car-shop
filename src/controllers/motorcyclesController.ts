import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Motorcycle } from '../interfaces/motorcycleInterface';
import MotorcycleService from '../services/motorcycleService';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { body } = req;
    const motorcycle = await this.service.create(body);
    if (motorcycle && 'error' in motorcycle) {
      return res.status(400).json(motorcycle);
    }
    return res.status(201).json(motorcycle);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const motorcycle = await this.service.readOne(id);
    if (!motorcycle) {
      return res.status(400).json({ error: this.errors.isIsNotValid });
    }
    if (motorcycle && 'error' in motorcycle) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    return res.status(200).json(motorcycle);
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    const motorcycle = await this.service.update(id, body);
    if (!motorcycle) {
      return res.status(400).json({ error: this.errors.isIsNotValid });
    }
    if ('error' in motorcycle && motorcycle.error === 'defaultError') {
      return res.status(404).json({ error: this.errors.notFound });
    }
    if ('error' in motorcycle) {
      return res.status(400).json(motorcycle);
    }
    return res.status(200).json(motorcycle);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.delete(id);
      return motorcycle
        ? res.status(204).send(motorcycle)
        : res.status(400).json({ error: this.errors.isIsNotValid });
    } catch (err) {
      return res.status(404).json({ error: this.errors.notFound });
    }
  };
}

export default MotorcycleController;