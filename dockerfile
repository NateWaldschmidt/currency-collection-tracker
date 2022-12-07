FROM node:18.4.0

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV HOST=app
EXPOSE 3000
CMD npm run dev -- --host