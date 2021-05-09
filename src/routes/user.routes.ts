import { Router } from 'express';
import { User } from '../entity/User';
import { getRepository, Repository } from 'typeorm';

export default class UserRouter {
  userRepository: Repository<User>;
  routes: Router;

  constructor() {
    this.routes = Router();
    this.userRepository = getRepository(User);

    //Listar apenas um Usuário
    this.routes.get('/user/:id', async (request, response) => {
      const { id } = request.params;

      try {
        const oneResult = await this.userRepository.findOne(id);

        return response.json(oneResult);
      } catch (error) {
        console.log(`ERRO NA ROTA GET:ID USER ROUTES: ${error}`);
      }
    });

    //Cadastrar Usuario Admin
    this.routes.post('/user', async (request, response) => {
      try {
        const { name, surname, username, password } = request.body;

        const userData = {
          name,
          surname,
          username,
          password,
        };

        await this.userRepository.save(userData);
      } catch (error) {
        console.log(`ERRO NA ROTA Cadastrar Usuario Admin ROUTES: ${error}`);
      }
    });
  }
}
