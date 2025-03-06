FROM node:20

WORKDIR /usr/src/app
COPY microservices/production/package*.json ./

RUN npm ci
COPY microservices/production .

RUN npm run build

EXPOSE 5003
CMD ["npm", "run", "start:prod"]
