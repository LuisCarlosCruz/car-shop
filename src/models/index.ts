import { Model as ModelMongoose } from 'mongoose';

import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: ModelMongoose<T>) { }

  create = async (objeto: T): Promise<T> => this.model.create({ ...objeto });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> => this.model.findOne({ id });

  update = async (id: string, objeto: T): Promise<T | null> => this.model
    .findByIdAndUpdate(id, objeto, { new: true });

  delete = async (id: string): Promise<T | null> => this.model
    .findByIdAndDelete(id);
}

export default MongoModel;