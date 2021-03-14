import 'reflect-metadata';

import '@container/index';
import '@container/providers';

import cron from 'node-cron';

import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';
import { container } from 'tsyringe';

const currencyProvider = container.resolve<ICurrencyConverterProvider>(
  'CurrencyConverterProvider',
);

function update() {
  currencyProvider
    .updateCurrenciesValues()
    .then(() => {
      console.log('Currencies updated sucessfully');
    })
    .catch(() => {
      console.log('Could not update currencies');
    });
}

cron.schedule('* * * * *', () => {
  update();
});

update();
