FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/publisher
WORKDIR /var/www/publisher
ADD . /var/www/publisher
RUN npm install
CMD npm run build && npm run seed && npm run start:prod