# Stage 1: Build all microfrontends
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy all apps
COPY ai-app ./ai-app
COPY auth-app ./auth-app
COPY business-app ./business-app
COPY comment-app ./comment-app
COPY event-app ./event-app
COPY resident-app ./resident-app
COPY shell-app ./shell-app

# Install dependencies for all microfrontends
RUN npm install && npm run install-microfrontends

# Build all microfrontends
RUN npm run start

# Stage 2: Serve built shell-app
FROM node:20 AS runner

WORKDIR /app

# Install serve to serve static build
RUN npm install -g serve

# Copy built shell app from builder stage
COPY --from=builder /app/shell-app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
