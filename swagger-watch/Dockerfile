FROM node:10-alpine

WORKDIR /api_doc/swagger-watch

COPY ./package.json /api_doc/swagger-watch/package.json
RUN yarn install

RUN apk update \
 && apk --no-cache add openjdk8    \
 && rm -rf /var/cache/apk/*


RUN npm i -g swagger-nodegen-cli

