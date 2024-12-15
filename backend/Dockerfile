# Use official Node.js image as base image
FROM node:23-alpine3.20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files and tsconfig file
COPY backend/package.json backend/yarn.lock backend/tsconfig.json ./

# Step 4: Install dependencies
RUN yarn install

# Copy the backend source code into the container
COPY backend/src ./src

# Step 6: Build the TypeScript code
RUN yarn build

# Step 7: Expose the backend port (default Express port)
EXPOSE 3000

# Step 8: Define the entrypoint command for the container
CMD ["yarn", "start"]
