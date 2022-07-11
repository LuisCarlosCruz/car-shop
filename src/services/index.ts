import { ZodError } from 'zod';
import Model from '../models';

interface ServiceError {
  error: ZodError;
}

abstract class Services<T> {
  constructor(protected model: Model<T>) {}

  public create = async (
    objeto: T,
  ): Promise<T | null | ServiceError> => this.model
    .create(objeto);

  public read = async (): Promise<T[]> => this.model.read();

  public readOne = async (id: string): Promise<T | null> => this.model
    .readOne(id);

  public update = async (id: string, objeto: T): Promise<T | null> => this.model
    .update(id, objeto);

  public delete = async (id: string): Promise<T | null> => this.model
    .delete(id);
}

export default Services;