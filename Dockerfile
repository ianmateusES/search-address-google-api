FROM node:14-alpine

RUN mkdir -p /home/node/api/node_modules
WORKDIR /home/node/api

COPY package.json ./
COPY docker-entrypoint.sh ./

RUN yarn

COPY . .

RUN yarn global add pm2

RUN yarn build

RUN rm -rf src

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3333

ENTRYPOINT [ "pm2-runtime", "dist/server.js", "--name payment_api" ]