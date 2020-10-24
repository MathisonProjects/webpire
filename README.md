# Webpire

## Set Environment Variables

Create a .env.development or .env.production environment file in your root. Copy the contents of .env.example and update the variables accordingly.

## Running App

```
$ docker build -t webpack:dev .
$ docker run -p 8081:8080 -p 8082:8080 --rm --name webpire webpire:dev
```