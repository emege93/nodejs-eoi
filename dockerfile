FROM node:12.18.3-buster-slim

RUN mkdir /code

WORKDIR /code

COPY package.json yarn.lock ./

RUN npm -g install yarn
RUN npm install

