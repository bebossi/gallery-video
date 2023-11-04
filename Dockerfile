FROM node:18.16.0

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

COPY .next ./.next

EXPOSE 3000

CMD ["npm", "run", "dev"]
