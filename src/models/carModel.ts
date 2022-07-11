import { Document, model as createModel, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './index';
// import { CarZod } from '../schemas/cars';

interface CarDocument extends Car, Document {}
// export type CarDocument = Car & Document;

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarModel extends MongoModel<CarDocument> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }

  public create = async (objeto: CarDocument) => {
    const created = await this.model.create(objeto);
    return created;
  };
}

export default CarModel;
export { CarDocument };
