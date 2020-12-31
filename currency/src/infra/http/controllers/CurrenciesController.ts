import CurrencyRepository from '@infra/typeorm/repositories/CurrencyRepository';
import CreateCurrencyService from '@services/impl/CreateCurrencyService';
import DeleteCurrencyService from '@services/impl/DeleteCurrencyService';
import UpdateCurrencyService from '@services/impl/UpdateCurrencyService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CurrenciesController {
  async index(_: Request, response: Response): Promise<Response> {
    const currencyRepository = new CurrencyRepository();

    const currencies = await currencyRepository.find();

    return response.json(currencies);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createCurrencyService = container.resolve(CreateCurrencyService);

    const { name: unknownCaseName, description } = request.body;

    const name = unknownCaseName.toUpperCase();

    const data = await createCurrencyService.execute({
      name,
      description,
    });

    return response.json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateCurrencyService = container.resolve(UpdateCurrencyService);

    const { name: unknownCaseName, description } = request.body;
    const { id } = request.params;

    const name = unknownCaseName.toUpperCase();

    const data = await updateCurrencyService.execute(id, {
      name,
      description,
    });

    return response.json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteCurrencyService = container.resolve(DeleteCurrencyService);

    const { id } = request.params;

    const data = await deleteCurrencyService.execute(id);

    return response.json(data);
  }
}
