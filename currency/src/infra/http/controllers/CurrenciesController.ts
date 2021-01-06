import CreateCurrencyService from '@services/impl/CreateCurrencyService';
import DeleteCurrencyService from '@services/impl/DeleteCurrencyService';
import ListCurrencyService from '@services/impl/ListCurrencyService';
import UpdateCurrencyService from '@services/impl/UpdateCurrencyService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import * as yup from 'yup';

const createValidator = yup.object().shape({
  name: yup.string().min(3).max(10).required('Field name is required'),
  description: yup.string().nullable(true).min(3).max(256),
});

const updateValidator = yup.object().shape({
  name: yup.string().min(3).max(10),
  description: yup.string().nullable(true).min(3).max(256),
});

export default class CurrenciesController {
  async index(_: Request, response: Response): Promise<Response> {
    const listCurrencyService = container.resolve(ListCurrencyService);
    const currencies = await listCurrencyService.findAll();

    return response.json(currencies);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createCurrencyService = container.resolve(CreateCurrencyService);

    await createValidator.validate(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

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

    await updateValidator.validate(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { name: unknownCaseName, description } = request.body;
    const { id } = request.params;

    const name = unknownCaseName && unknownCaseName.toUpperCase();

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
