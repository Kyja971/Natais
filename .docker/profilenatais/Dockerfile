FROM node:20

WORKDIR /usr/src/app
COPY microservices/profilenatais/package*.json ./

RUN npm ci
COPY microservices/profilenatais .

RUN npm run build

EXPOSE 5003
CMD ["npm", "run", "start:prod"]
