# Stage 1: Build all microfrontends
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy all apps
COPY shell-app ./shell-app

# Install dependencies for all microfrontends
RUN npm install

# Stage 2: Serve built shell-app
FROM node:20 AS runner

WORKDIR /app

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
