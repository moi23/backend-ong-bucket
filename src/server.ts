import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Routes from './routes';
import cors from 'cors';

const server = express();
server.use(express.json());

createConnection()
  .then(async (connection) => {
    const routes = new Routes();
    server.use(cors());
    server.use(routes.routes);

    // server.use('/', (req, res, next) => {
    //   return res.json({
    //     message: 'fui acessado ui ui',
    //   });
    // });

    console.log('conexão feita com sucesso');

    server.listen(3333, () => console.log('API RUNNING ON PORT 3333'));
  })
  .catch((error) => console.log(error));
