FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install pm2 -g
RUN npm install --silent
RUN npm run build

COPY .env /app/dist

CMD ["pm2-runtime", "ecosystem.config.js"]