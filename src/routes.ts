import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';

import DonatorRouter from './routes/donator.routes';
import FamilyRouter from './routes/family.routes';
import UserRouter from './routes/user.routes';

export default class Routes {
  routes: Router;
  donatorRouter: DonatorRouter;
  familyRouter: FamilyRouter;
  userRouter: UserRouter;

  constructor() {
    this.routes = Router();
    this.donatorRouter = new DonatorRouter();
    this.familyRouter = new FamilyRouter();
    this.userRouter = new UserRouter();

    this.routes.use('/donator', this.donatorRouter.routes);
    this.routes.use('/family', this.familyRouter.routes);
    this.routes.use('/user', this.userRouter.routes);
  }
}
