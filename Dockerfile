# Use the official Node.js 18 image as the base image
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /app

# Install a specific version of npm
RUN npm install -g npm@10.2.1

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install esbuild in the Docker image
RUN npm install -g esbuild

# Use npm ci to install project dependencies
RUN npm ci

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the app
CMD ["npm", "run", "dev"]
