import { Router } from 'express';

import currenciesRouter from '@infra/http/routes/currencies.routes';

const routes = Router();

routes.get('/', (req, res) => res.send('ok'));
routes.use('/currencies', currenciesRouter);

export default routes;
