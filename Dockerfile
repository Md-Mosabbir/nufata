# Development Dockerfile for Medusa
FROM node:20-alpine

# Set working directory inside container
WORKDIR /server

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Medusa's port
EXPOSE 9000

# Start dev server
CMD ["npm", "run", "dev"]
