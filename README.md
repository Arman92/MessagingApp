# MessagingApp
MERN Stack messaging app

## Introduction
MessagingApp is a real-time messaging service built with Node.js, Mongodb, Express.js, Socket.IO, TypeScript and unit tested with Mocha and Chai.


## Key features:
* Persistance messages in MongoDB
* Real-time message sending using WebSockets (Socket.IO)
* Scalable architecture with future ability to scale horizontally


## Installation
```bash
 git clone git@github.com:Arman92/MessagingApp.git && cd MessagingApp/backend
 yarn
```

## Docker
This project has ready to test docker-compose configs.
There are two docker-compose and Dockerfiles, one for production and the other for development with hot reload
and debug ability.

First, you'll need to copy `.env.template` and rename it to `.env`

It should look something like the following, for a Docker environment:

```bash
APP_PORT=8000                        # Exposed port for node.js server app
APP_HOST=localhost                   # localhost is ok on docker


# Config for MongoDB
MONGO_DB_NAME = "messagingDb"
MONGO_USER = "messagingDbUser"
MONGO_PASSWORD = "some-secret-pass"
MONGO_HOST = "mongodbserver"         # If you changed MONGO_HOST, remember to change it on docker-compose.yml also.
MONGO_PORT=27017

```

After setting `.env`, you are ready to run the backend services:
```bash
docker-compose up -d                                      # For production
# or
docker-compose -f ./docker-compose.dev.yml up -d          # For develpment and debugging
```
