FROM node:18.12.1 AS base_image

WORKDIR /usr/app

COPY . /usr/app/

RUN npm install --dev-only

RUN npm install

RUN npm i -g nodemon