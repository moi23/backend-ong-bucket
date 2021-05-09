import { Router } from 'express';
import { Family } from '../entity/Family';
import { getRepository, Repository } from 'typeorm';

export default class FamilyRouter {
  familyRepository: Repository<Family>;
  routes: Router;

  constructor() {
    this.routes = Router();
    this.familyRepository = getRepository(Family);

    this.routes.get('/', async (request, response) => {
      try {
        const familyData = await this.familyRepository.find();
        return response.json(familyData);
      } catch (error) {
        console.log(`ERRO NA ROTA GET FAMILY ROUTES: ${error}`);
      }
    });

    this.routes.get('/:id', async (request, response) => {
      const { id } = request.params;

      try {
        const oneResult = await this.familyRepository.findOne(id);

        return response.json(oneResult);
      } catch (error) {
        console.log(error);
      }
    });

    this.routes.post('/', async (request, response) => {
      try {
        const {
          name,
          surname,
          qty_children,
          district,
          zip_code,
          number_house,
          complement,
          city,
          qty_people_live,
          whatsapp,
        } = request.body;

        const familyData = {
          name,
          surname,
          qty_children,
          district,
          zip_code,
          number_house,
          complement,
          city,
          helped: false,
          qty_people_live,
          whatsapp,
        };

        await this.familyRepository.save(familyData);

        return response.json({
          message: 'Family successfully registered 😁',
        });
      } catch (erro) {
        console.log(`ERRO NA ROTA POST FAMILY ROUTES: ${erro}`);
      }
    });
  }
}
