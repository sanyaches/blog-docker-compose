FROM node:10

WORKDIR /usr/src/app-server

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8000

CMD [ "node", "server.js" ]
