# infra/docker/ai-service.Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY ./ai-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY ./ai-service/app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
