import CurrencyConversionServiceProxy from '@services/proxies/CurrencyConversionServiceProxy';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ConvertCurrenciesController {
  async index(request: Request, response: Response): Promise<Response> {
    const { from, to, amount = 1 } = request.query;

    if (!from && !to) {
      return response.status(400).send({
        message: 'Bad request. "from" and "to" are required',
      });
    }

    if (!Number(amount)) {
      return response.status(400).send({
        message: 'Bad request. Amount needs to be a number',
      });
    }

    const currencyConversionServiceProxy = container.resolve(
      CurrencyConversionServiceProxy,
    );

    const resultConversion = await currencyConversionServiceProxy.convert(
      from as string,
      to as string,
      amount as number,
    );

    return response.json(resultConversion);
  }
}
