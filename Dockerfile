# Use an official Node runtime as a parent image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . ./

# Install any needed dependencies specified in package.json
RUN npm install

# Build the React app for production to the dist folder
RUN npm run build

# Use Nginx to serve the React App
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
