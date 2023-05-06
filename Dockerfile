FROM node:16

RUN apt-get update \
    && apt-get install postgresql-contrib libpq-dev postgresql-client -y

WORKDIR /dlv

COPY tsconfig.json package.json config.json docker/run.sh ./
COPY src src

RUN npm install \
    && npm run-script build

ENTRYPOINT ["run.sh"]
