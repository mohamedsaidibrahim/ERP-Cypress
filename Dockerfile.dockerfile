# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Cypress
RUN npm install cypress --save-dev

# Copy the rest of your application code
COPY . .

# Set the environment variable for Cypress
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# Expose the port that Cypress will use
EXPOSE 3000

# Command to run your tests
CMD ["npm", "run", "cy:run"]  # or use cypress open if you want a GUI
