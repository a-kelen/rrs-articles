FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start:prod"]
