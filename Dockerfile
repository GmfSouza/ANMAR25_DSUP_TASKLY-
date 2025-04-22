# Use Node.js 18 as the base image

FROM node:20-alpine3.18.4

# Set working directory

WORKDIR /usr/src/app

# Copy package.json and package-lock.json

COPY package\*.json ./

# Install dependencies

RUN npm install

# Copy the rest of the application code

COPY . .

# Expose the port the app runs on

EXPOSE 3000

# Command to run the app (can be overridden in docker-compose.yml)

CMD ["npm", "run", "start"]