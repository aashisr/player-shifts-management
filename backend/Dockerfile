# Use official Node.js image as base image
FROM node:23-alpine3.20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files and tsconfig file
COPY backend/package.json backend/yarn.lock backend/tsconfig.json ./

# Install dependencies
RUN yarn install

# Install nodemon globally
RUN yarn global add nodemon

# Copy the backend source code into the container
COPY backend/src ./src

# Expose the backend port (default Express port)
EXPOSE 5000

# Apply TypeORM migrations and start the server with nodemon
CMD ["sh", "-c", "yarn typeorm migration:run -d src/config/data-source.ts && nodemon --watch src --exec 'ts-node' src/index.ts"]