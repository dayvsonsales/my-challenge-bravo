#!/bin/bash

npm run typeorm migration:run
npm run seed:run

pm2-runtime ecosystem.config.js