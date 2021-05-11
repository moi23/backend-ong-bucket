import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Stock } from './../entity/Stock';

export default class StockRouter {
  routes: Router;
  stockRepository: Repository<Stock>;

  constructor() {
    this.routes = Router();
    this.stockRepository = getRepository(Stock);

    // Post value in the Stock
    this.routes.post('/', async (request, response) => {
      try {
        const { value, description } = request.body;

        const stockData = {
          value,
          description,
        };

        await this.stockRepository.save(stockData);

        return response.json({
          message: 'Stock registered success!',
        });
      } catch (error) {
        return response.json({
          message: 'Sorry you do not post stock because you have a problem',
          error: error,
        });
      }
    });

    //Get all value in the Stock
    this.routes.get('/', async (request, response) => {
      try {
        const stockData = this.stockRepository.find();

        return response.json(stockData);
      } catch (error) {
        return response.json({
          message: 'Error on get Stock',
          errorMessage: error,
        });
      }
    });
  }
}
