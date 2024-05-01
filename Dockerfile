FROM node:18

WORKDIR /usr/src/app

RUN npm install pm2 -g
COPY package*.json ./
ENV TZ=${TZ}
ENV NODE_ENV=production
RUN npm install
COPY . .

EXPOSE 80
CMD ["pm2-runtime", "bin/www"]