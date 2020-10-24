FROM node:lts-alpine

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN sudo ./aws/install
RUN npm install -g http-server
RUN npm install -g pm2
RUN npm install -g dynamodb-admin
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