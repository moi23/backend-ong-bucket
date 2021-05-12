import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';

import DonatorRouter from './routes/donator.routes';
import FamilyRouter from './routes/family.routes';
import UserRouter from './routes/user.routes';
import StockRouter from './routes/stock.routes';
import AuthRouter from './routes/auth.routes';

import AuthMiddleware from './middlewares/auth.middleware';

export default class Routes {
  donatorRouter: DonatorRouter;
  familyRouter: FamilyRouter;
  userRouter: UserRouter;
  stockRouter: StockRouter;
  authRouter: AuthRouter;
  routes: Router;

  constructor() {
    this.routes = Router();
    this.donatorRouter = new DonatorRouter();
    this.familyRouter = new FamilyRouter();
    this.userRouter = new UserRouter();
    this.stockRouter = new StockRouter();
    this.authRouter = new AuthRouter();

    this.routes.use('/donator', this.donatorRouter.routes);
    this.routes.use('/family', this.familyRouter.routes);
    this.routes.use('/user', this.userRouter.routes);
    this.routes.use('/stock', this.stockRouter.routes);
    this.routes.use('/auth', this.authRouter.routes);

    this.routes.post('/elfin', AuthMiddleware, (request, response) => {
      const { nome, sobrenome } = request.body;
      return response.json(request.body);
    });
  }
}
