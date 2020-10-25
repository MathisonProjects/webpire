FROM node:lts-alpine

RUN apk add curl python
RUN curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
RUN unzip awscli-bundle.zip
RUN ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
RUN aws configure set aws_access_key_id default_access_key
RUN aws configure set aws_secret_access_key default_secret_key
RUN aws configure set default.region us-west-2
RUN npm install -g http-server pm2 dynamodb-admin
WORKDIR /app
COPY package*.json ./
COPY .env.development ./
COPY .env.production ./
RUN npm install
COPY . .

RUN npm run dev

EXPOSE 8000
EXPOSE 8001
EXPOSE 8081
EXPOSE 8082

CMD [ "npm", "run", "dockerDeploy" ]