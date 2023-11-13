# # Use a base image with Node.js
# FROM node:lts-alpine AS builder

# RUN apk --no-cache add git

# # Set working directory inside the container
# WORKDIR /usr/src/app

# COPY --chown=node:node ["package*.json", "./"]

# RUN npm cache clean --force

# # Install app dependencies
# RUN npm install

# # Copy the rest of the application code into the container
# COPY . .

# ENV DATABASE_URL DATABASE_URL

# RUN npm run generate

# # Build the TypeScript application
# RUN npm run build

# COPY --chown=node:node . /usr/src/app

# FROM node:lts-alpine

# RUN apk add dumb-init

# USER node

# WORKDIR /usr/src/app

# COPY --chown=node:node --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

# COPY --chown=node:node --from=builder /usr/src/app/ /usr/src/app/

# CMD ["node", "dist/app.js"]
