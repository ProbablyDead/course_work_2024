FROM python:3.9 as builder
WORKDIR /backend
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
COPY /backend/pyproject.toml /backend/poetry.lock ./
RUN poetry install --no-dev # Установка без зависимостей для разработки

# Финальный этап для Python, без Poetry.
FROM python:3.9-slim
WORKDIR /backend/
COPY --from=builder /backend ./
CMD ["python", "-m", "backend.start"] # Укажите основной скрипт вашего приложения
