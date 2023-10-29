FROM node:18

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
