FROM node:16

WORKDIR /ng-teste-backend
COPY package.json .
RUN npm install
COPY . .