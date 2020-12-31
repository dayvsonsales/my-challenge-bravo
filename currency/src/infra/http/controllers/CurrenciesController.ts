import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CurrenciesController {
  async index(request: Request, response: Response): Promise<Response> {}

  async create(request: Request, response: Response): Promise<Response> {}

  async update(request: Request, response: Response): Promise<Response> {}

  async delete(request: Request, response: Response): Promise<Response> {}
}
