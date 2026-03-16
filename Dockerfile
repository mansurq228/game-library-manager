FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/

WORKDIR /app/server

RUN npm install

COPY server/ .

EXPOSE 3000

CMD ["npm", "start"]
