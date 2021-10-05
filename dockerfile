FROM node:14.18.0-alpine As development

WORKDIR /fiserver

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package*.json  ./

RUN npm install --only=development

COPY . .

# RUN npm i rimraf

RUN npm run build

FROM node:14.18.0-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /fiserver

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
