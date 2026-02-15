# Dockerfile for Capafest Development Environment
FROM node:20-alpine

# Install git for version control
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Install dependencies for better development experience
RUN npm install -g npm@latest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port for Next.js dev server
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
