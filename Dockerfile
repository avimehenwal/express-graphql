FROM node:16.18.0 as build
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run compile
EXPOSE 4000
CMD ["node", "dist/index.js"]