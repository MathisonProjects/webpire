# Webpire

## Description

This project is meant to help developers quickly get started developing with a Node Server, VueJs Application, and work with DynamoDb, while maintaining consistency with Docker.

## Set Environment Variables

Create a .env.development or .env.production environment file in your root. Copy the contents of .env.example and update the variables accordingly.

## Running App

```sh
$ docker network create --subnet=172.18.0.0/16 webpire-net
$ docker run --net webpire-net --ip 172.18.0.01 -p 8000:8000 amazon/dynamodb-local
$ docker build -t webpire:dev .
$ docker run --net webpire-net --ip 172.18.0.02 -p 8001:8001 -p 8081:8081 -p 8082:8082 --name webpire webpire:dev
```

## Developer

Jacob Mathison