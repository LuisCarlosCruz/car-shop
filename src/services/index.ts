import { ZodError } from 'zod';
import Model from '../models';

export interface ServiceError {
  error: ZodError;
}

export interface Error {
  error: 'defaultError'
}

abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  public async create(body: T): Promise<T | null | ServiceError> {
    return this.model.create(body);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | Error | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, body: T):
  Promise<T | null | Error | ServiceError> {
    return this.model.update(id, body);
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}

export default Service;