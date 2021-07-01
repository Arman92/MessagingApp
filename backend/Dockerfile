
#  Dockerfile for Node Express Backend api (production)

FROM node:lts-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install Dependencies 
COPY package.json yarn*.lock ./
RUN yarn --frozen-lockfile

# Copy app source code
COPY . .
# build
RUN yarn run build

ARG NODE_ENV=production
ARG APP_PORT

CMD ["yarn", "prod"]

# Exports
EXPOSE $APP_PORT