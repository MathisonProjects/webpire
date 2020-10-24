FROM node:lts-alpine


RUN npm install -g http-server
RUN npm install -g pm2
WORKDIR /app
COPY package*.json ./
COPY .env.development ./
COPY .env.production ./
RUN npm install
COPY . .

RUN npm run dev

EXPOSE 8081
EXPOSE 8082

CMD [ "npm", "run", "dockerDeploy" ]