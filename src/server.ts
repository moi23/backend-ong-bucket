import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const server = express();

createConnection()
  .then(async (connection) => {
    server.use(express.json());

    server.use('/', (req, res, next) => {
      return res.json({
        message: 'fui acessado',
      });
    });

    console.log('conexão feita com sucesso');

    server.listen(3333, () => console.log('API RUNNING ON PORT 3333'));
  })
  .catch((error) => console.log(error));

server.listen('3000');
