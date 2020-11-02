FROM node:alpine AS base

ARG IMAGE_CREATION
ARG IMAGE_VERSION

LABEL eu.epitech.image.created="${IMAGE_CREATION}"
LABEL eu.epitech.image.authors="Guillaume BONNET <guillaume.bonnet@epitech.eu>, Lucas MATHIEUX <lucas.mathieux@epitech.eu>"
LABEL eu.epitech.image.url="https://github.com/MrSquaare/DEV_dashboard_2020/backend/README.md"
LABEL eu.epitech.image.source="https://github.com/MrSquaare/DEV_dashboard_2020/backend"
LABEL eu.epitech.image.version="${IMAGE_VERSION}"
LABEL eu.epitech.image.vendor="Epitech"
LABEL eu.epitech.image.licenses="MIT"
LABEL eu.epitech.image.title="Dashboard Backend"
LABEL eu.epitech.image.description="All your information in the blink of an eye"

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY package.json ./


FROM base AS build

RUN yarn install

COPY ./ ./

RUN yarn build


FROM base

RUN yarn install --production

COPY --from=build ${APP_DIRECTORY}/build/ ./build/

ENV HOSTNAME="0.0.0.0"
ENV PORT=8081

EXPOSE ${PORT}

CMD yarn start
