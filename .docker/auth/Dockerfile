FROM node:20

WORKDIR /usr/src/app
COPY microservices/auth/package*.json ./

RUN npm ci
COPY microservices/auth .

RUN npm run build

EXPOSE 5001
CMD ["npm", "run", "start:prod"]
