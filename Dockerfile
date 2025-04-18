FROM node:18

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
