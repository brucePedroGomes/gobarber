FROM node:12 as build
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build


FROM node:12
COPY --from=build /app /app
WORKDIR /app
RUN yarn start
