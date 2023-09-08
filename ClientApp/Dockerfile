# Build: docker build -t client-app .
 FROM node:18-bullseye-slim as builder

ARG GIT_REVISION
ENV GIT_REVISION $GIT_REVISION

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build app
COPY src ./src
COPY vite.config.ts index.html tsconfig.json .env* ./
RUN pnpm run build

# Build nginx image
FROM nginx:stable-alpine

# Copy tapp files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]