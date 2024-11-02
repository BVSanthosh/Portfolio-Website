# Use the official Node.js image as a base image
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use an official Nginx image to serve the build output
FROM nginx:alpine

# Copy the build output to Nginx's public folder
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Define the command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
