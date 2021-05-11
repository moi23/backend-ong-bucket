import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Donator } from './../entity/Donator';

export default class DonatorRouter {
  donatorRepository: Repository<Donator>;
  routes: Router;

  constructor() {
    this.routes = Router();
    this.donatorRepository = getRepository(Donator);

    // Get Donator by ID
    this.routes.get('/:id', async (request, response) => {
      const { id } = request.params;
      try {
        const oneResult = await this.donatorRepository.findOne(id);

        return response.json(oneResult);
      } catch (error) {
        return response.status(400).json({
          message: 'Sorry cannot get the donator by id',
          error: error,
        });
      }
    });

    // Get all Donators
    this.routes.get('/', async (request, response) => {
      try {
        const allDonatorsData = await this.donatorRepository.find();

        return response.json(allDonatorsData);
      } catch (error) {
        return response.status(400).json({
          message: 'Sorry cannot get family',
          error: error,
        });
      }
    });

    //Create Donator
    this.routes.post('/', async (request, response) => {
      try {
        const { name, whatsapp } = request.body;

        const donatorData = {
          name,
          whatsapp,
        };

        await this.donatorRepository.save(donatorData);
        return response.json({
          message: 'Donator Cadastrado com sucesso!',
        });
      } catch (error) {
        console.log(`ERRO NA ROTA Donator Routes ${error}`);
      }
    });
  }
}
