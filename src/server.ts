import CustomRouter from './routes/index';
import App from './app';
import CarController from './controllers/carController';
import { CarDocument } from './models/carModel';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<CarDocument>();
carRouter.addRouter(carController);

server.addRouter(carRouter.router);

// server.startServer();

export default server;