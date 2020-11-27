FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION

LABEL eu.epitech.image.created="${IMAGE_CREATION}"
LABEL eu.epitech.image.authors="Guillaume BONNET <guillaume.bonnet@epitech.eu>, Lucas MATHIEUX <lucas.mathieux@epitech.eu>"
LABEL eu.epitech.image.url="https://github.com/MrSquaare/DEV_dashboard_2020/web/README.md"
LABEL eu.epitech.image.source="https://github.com/MrSquaare/DEV_dashboard_2020/web"
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

COPY ./web ./web

COPY ./server/service/ ./server/service/

COPY ./server/services/ ./server/services/

COPY ./server/types/ ./server/types/

COPY ./server/oauth/ ./server/oauth/

RUN yarn install --pure-lockfile

RUN yarn build


FROM base

COPY --from=build ${APP_DIRECTORY}/web/ ./web/

RUN yarn install --production --pure-lockfile

RUN yarn cache clean --all

RUN rm -rf ./web/**/src

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

ENV SERVER_PROTOCOL="http"
ENV SERVER_HOSTNAME="localhost"
ENV SERVER_PORT=4000

EXPOSE ${PORT}

CMD yarn start:web
