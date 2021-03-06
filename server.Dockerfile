FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION

LABEL eu.epitech.image.created="${IMAGE_CREATION}"
LABEL eu.epitech.image.authors="Guillaume BONNET <guillaume.bonnet@epitech.eu>, Lucas MATHIEUX <lucas.mathieux@epitech.eu>"
LABEL eu.epitech.image.url="https://github.com/MrSquaare/DEV_dashboard_2020/server/README.md"
LABEL eu.epitech.image.source="https://github.com/MrSquaare/DEV_dashboard_2020/server"
LABEL eu.epitech.image.version="${IMAGE_VERSION}"
LABEL eu.epitech.image.vendor="Epitech"
LABEL eu.epitech.image.licenses="MIT"
LABEL eu.epitech.image.title="Dashboard"
LABEL eu.epitech.image.description="All your information in the blink of an eye"

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY lerna.json package.json tsconfig.json yarn.lock ./


FROM base AS build

COPY ./parties/passport-oauth1 ./parties/passport-oauth1
COPY ./server ./server

RUN yarn install --pure-lockfile

RUN yarn build


FROM base

COPY --from=build ${APP_DIRECTORY}/parties/passport-oauth1/ ./parties/passport-oauth1/
COPY --from=build ${APP_DIRECTORY}/server/ ./server/

RUN yarn install --production --pure-lockfile

RUN yarn cache clean --all

RUN rm -rf ./server/**/src

ENV HOSTNAME="0.0.0.0"
ENV PORT=4000

ENV DATABASE_HOSTNAME=localhost
ENV DATABASE_PORT=27017
ENV DATABASE_DATABASE=db

EXPOSE ${PORT}

CMD yarn start:server
