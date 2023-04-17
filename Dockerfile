FROM node:16-bullseye-slim

ARG GITHUB_ACCESS_TOKEN=

WORKDIR /usr/app

COPY ./prisma         ./prisma
COPY .npmrc .yarnrc package.json yarn.lock ./

RUN echo //npm.pkg.github.com/:_authToken=$GITHUB_ACCESS_TOKEN >> ~/.npmrc
RUN yarn install --frozen-lockfile --production
# RUN ./node_modules/.bin/prisma generate

COPY ./public         ./public
COPY ./src            ./src
# COPY schema.gql tsconfig.build.json tsconfig.json ./
COPY tsconfig.build.json tsconfig.json ./

RUN yarn build

EXPOSE 3049

CMD [ "node", "-r", "dd-trace/init", "./dist/src/main.js" ]
