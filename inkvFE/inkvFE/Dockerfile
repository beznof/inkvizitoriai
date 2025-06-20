# Image
FROM node:18-alpine

# Working directory
WORKDIR /inkvFE

# Copying dependencies before `npm install` to retrieve cached results if depdendencies haven't changed
COPY package*.json ./ 

# Install dependnecies
RUN npm install

# Copying the rest of the files
COPY ./ ./

# Exposing the port
EXPOSE 5173

# Starting the app
CMD ["npm", "run", "dev", "--host"]
