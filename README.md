# Webpire

## Description

This project is meant to help developers quickly get started developing with a Node Server, VueJs Application, and work with DynamoDb, while maintaining consistency with Docker.

## Set Environment Variables

Create a .env.development or .env.production environment file in your root. Copy the contents of .env.example and update the variables accordingly.

## Running App

```sh
$ docker run -p 8000:8000 amazon/dynamodb-local
$ npm install -g dynamodb-admin
$ dynamodb-admin &
$ docker build -t webpire:dev .
$ docker run -p 8081:8081 -p 8082:8082 --name webpire webpire:dev
```

## Developer

Jacob Mathison