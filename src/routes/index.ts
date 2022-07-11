import { Router } from 'express';
import Controller from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRouter(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, (req, res) => controller.create(req, res));
  }
}

export default CustomRouter;