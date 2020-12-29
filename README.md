# Webpire

## Description

This project is meant to help developers quickly get started developing with a Node Server, VueJs Application, and work with DynamoDb, while maintaining consistency with Docker.

## Set Environment Variables

Create a .env.development or .env.production environment file in your root. Copy the contents of .env.example and update the variables accordingly.

## Deploying the App

```sh
$ git clone https://github.com/MathisonProjects/webpire.git
$ cd webpire
$ ./init.sh prod
```

## Developing

### Requirements
- dynamodb-admin [ npm install -g dynamodb-admin ]
- Docker

### Script to Start
```sh
$ git clone https://github.com/MathisonProjects/webpire.git
$ cd webpire
$ ./init.sh dev
```

### Deployment Services
- Route 53
- Instance Auto Scaling
- Load Balancers
- S3
- CloudFront
- IAM
- DynamoDb
- Code Pipeline

## Site Directory

http://localhost:8082 - Confirm NodeJs Server is running and connects you to the rest of the application.

## Developer

Jacob Mathison