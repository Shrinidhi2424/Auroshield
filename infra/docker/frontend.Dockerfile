# infra/docker/frontend.Dockerfile
FROM node:18

WORKDIR /app

# Install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install -g expo-cli
RUN npm install

# Copy source
COPY ./frontend .

EXPOSE 19006
CMD ["npx", "expo", "start", "--tunnel"]
