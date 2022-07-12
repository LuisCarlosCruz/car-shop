import { Car } from './interfaces/CarInterface';
import CarController from './controllers/carController';
import App from './app';
import CustomRouter from './routes';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();

carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
