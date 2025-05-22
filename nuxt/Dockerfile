FROM node:20-alpine

RUN apk add --no-cache bash openssl sqlite

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install --save-dev prisma && npm install @prisma/client

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
