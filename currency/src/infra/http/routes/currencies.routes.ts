import { Router } from 'express';
import ConvertCurrenciesController from '../controllers/ConvertCurrenciesController';

import CurrenciesController from '../controllers/CurrenciesController';

const currenciesRouter = Router();
const currenciesController = new CurrenciesController();
const convertCurrenciesController = new ConvertCurrenciesController();

currenciesRouter.get('/convert', convertCurrenciesController.index);

currenciesRouter.get('/', currenciesController.index);
currenciesRouter.post('/', currenciesController.create);
currenciesRouter.put('/:id', currenciesController.update);
currenciesRouter.delete('/:id', currenciesController.delete);

export default currenciesRouter;
