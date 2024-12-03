# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies inside the container
RUN npm install

# Copy all other files (db.json, server.js, etc.)
COPY . .

# Expose port 3000 for the API
EXPOSE 3000

# Run json-server using server.js
CMD ["node", "server.js"]
