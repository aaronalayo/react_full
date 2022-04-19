FROM node:17

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

CMD [ "node", "server.js" ]