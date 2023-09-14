# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000 (the port our app runs on, adjust if your port is different)
EXPOSE 5000

# Specify the command to run when the container starts
CMD [ "node", "server.js" ]
