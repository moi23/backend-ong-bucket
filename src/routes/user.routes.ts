import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';

export default class UserRouter {
  userRepository: Repository<User>;
  routes: Router;

  constructor() {
    this.routes = Router();
    this.userRepository = getRepository(User);

    //Listar todos
    this.routes.get('/', async (request, response) => {
      try {
        const data = await this.userRepository.find();

        return response.json(data);
      } catch (error) {
        console.log(error);
      }
    });

    //Listar apenas um Usuário
    this.routes.get('/:id', async (request, response) => {
      const { id } = request.params;

      try {
        const oneResult = await this.userRepository.findOne(id);

        return response.json(oneResult);
      } catch (error) {
        console.log(`ERRO NA ROTA GET:ID USER ROUTES: ${error}`);
      }
    });

    //Cadastrar Usuario Admin
    this.routes.post('/', async (request, response) => {
      try {
        const { name, surname, username, password } = request.body;
        const hash = await bcrypt.hash(password, 7);

        if (!hash) {
          return response.status(500).json({
            message: 'erro no hash',
          });
        }

        const userData = {
          name,
          surname,
          username,
          password: hash,
        };

        console.log(userData);

        await this.userRepository.save(userData);

        return response.json(userData);
      } catch (error) {
        console.log(`ERRO NA ROTA Cadastrar Usuario Admin ROUTES: ${error}`);
      }
    });
  }
}
