npm run resetSeed

docker network create --subnet=172.18.0.0/16 webpire-net
docker run --net webpire-net --ip 172.18.0.02 -p 8000:8000 amazon/dynamodb-local &
docker image rm webpire:dev
docker build -t webpire:dev .
docker run --net webpire-net --ip 172.18.0.03 -p 8001:8001 -p 8081:8081 -p 8082:8082 --name webpire-dev webpire:dev &
