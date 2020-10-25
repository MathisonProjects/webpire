#!/bin/bash
echo "|----------------------------------------|"
echo "|----- Initializing Webpire for: $1 -----|"
echo "|----------------------------------------|"

pm2 stop ./node/server.js
ps -ef | grep 'dynamodb-admin' | grep -v grep | awk '{print $2}' | xargs -r kill -9

if [[ "$1" == "prod" ]]
then
    npm run resetSeed
    docker network create --subnet=172.18.0.0/16 webpire-net
    docker run --net webpire-net --ip 172.18.0.02 -p 8000:8000 amazon/dynamodb-local &
    docker image rm webpire:dev
    docker build -t webpire:dev .
    docker run --net webpire-net --ip 172.18.0.03 -p 8001:8001 -p 8081:8081 -p 8082:8082 --name webpire-dev webpire:dev &
fi

if [[ "$1" == "dev" ]]
then
    npm run seedDynamoDev
    DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin &
    pm2 start ./node/server.js --watch &
    npm run hot &
fi