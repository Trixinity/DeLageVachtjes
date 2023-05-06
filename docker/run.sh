#!/bin/bash

set -e

psql -tc "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DATABASE'" | grep -q 1 || psql -c "CREATE DATABASE $POSTGRES_DATABASE"

node dist/
