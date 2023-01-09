FROM node:16

RUN apt-get update \
    && apt-get install postgresql-contrib libpq-dev -y

WORKDIR /dlv

COPY tsconfig.json package.json config.json ./
COPY src src

RUN npm install \
    && npm run-script build

ENTRYPOINT ["node", "dist/"]
