FROM node:18

# working directory
WORKDIR /usr/src/app

# Copy Package Json Files
COPY package*.json ./

# install files
RUN npm ci

# Copy source files
COPY . .

# expose the API Port
EXPOSE 3000

CMD ["node", "app.js"]