########################
# Server builder stage #
########################
FROM python:3.12 as backend-builder
WORKDIR /backend

# Install poetry
RUN curl -sSL https://install.python-poetry.org | python -

# Install project dependencies
COPY /backend/pyproject.toml /backend/poetry.lock ./
ENV PATH="${PATH}:/root/.local/bin"
RUN poetry config virtualenvs.create false && poetry install --no-dev

COPY . .

########################
# Client builder stage #
########################
FROM node:22-alpine as client-builder
WORKDIR /client

COPY /client /client
RUN npm install && npm run build 

####################
# Production stage #
####################
FROM python:3.12-slim
WORKDIR /app

COPY --from=backend-builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=backend-builder /usr/local/bin /usr/local/bin

COPY --from=backend-builder /backend/backend /app
COPY --from=client-builder /client/build /app/client/build

ENV CLIENT_PATH="/app/client/build"
ENV MONGO_DB_PATH="mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb:27017/"

EXPOSE 8000

CMD ["python", "-m", "backend"] 

