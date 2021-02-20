FROM node:slim as builder
WORKDIR "/app/src"
COPY package.json ./
RUN npm install
RUN npm install typescript -g
COPY ./src .
COPY ./tsconfig.build.json .
RUN tsc -p ./tsconfig.build.json

FROM node:slim
WORKDIR "/app"
COPY package.json .
RUN npm install knex -g
RUN npm install
COPY --from=builder /app/src/build .
COPY . .
CMD ["npm", "run", "host"]
EXPOSE 3001
