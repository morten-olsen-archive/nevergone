FROM node:15-alpine as builder
WORKDIR /app
COPY package.json yarn.lock /app/
COPY packages/api/package.json /app/packages/api/package.json
RUN yarn install
COPY . /app/
WORKDIR /app/packages/api
RUN yarn bundle

FROM node:15-alpine
ENV DATA_PATH=/data
RUN apk update \
    && apk add sqlite \
    && mkdir /data
WORKDIR /app
COPY --from=builder /app/packages/api/build /app/
CMD ["node", "/app/index.js"]
