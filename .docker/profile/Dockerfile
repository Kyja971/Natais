FROM node:20

WORKDIR /usr/src/app
COPY microservices/profile/package*.json ./

RUN npm ci
COPY microservices/profile .

RUN npm run build

EXPOSE 5003
CMD ["npm", "run", "start:prod"]
