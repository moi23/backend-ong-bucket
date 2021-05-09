import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Donator } from './../entity/Donator';

export default class DonatorRouter {
  donatorRepository: Repository<Donator>;
  routes: Router;

  constructor() {
    this.routes = Router();
    this.donatorRepository = getRepository(Donator);

    this.routes.get('/donator', async (request, response, next) => {});
    this.routes.post('/donator', async (request, response, next) => {});
  }
}
