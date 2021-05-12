import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from './../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthenticationRouter {
  usuarioRepository: Repository<User>;
  routes: Router;

  constructor() {
    this.usuarioRepository = getRepository(User);
    this.routes = Router();

    this.routes.post('/', async (request, response) => {
      try {
        const { username, password } = request.body;

        const usuarioExistente = await this.usuarioRepository.findOneOrFail({
          where: { username },
        });

        const validasenha = await bcrypt.compare(
          password,
          usuarioExistente.password
        );

        if (!validasenha) {
          return response.json({
            message: 'DEU RUIM acho que a senha está invalida',
          });
        }

        const token = jwt.sign(
          {
            id_usuario: usuarioExistente.id,
          },
          'celcinhopikao',
          { expiresIn: '6d' }
        );

        return response.json({
          message: 'usuario logado com sucesso',
          token,
        });
      } catch (error) {
        return response.json({
          message: 'UI UI errinho',
          error,
        });
      }
    });
  }
}
