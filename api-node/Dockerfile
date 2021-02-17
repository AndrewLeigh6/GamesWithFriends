FROM node:slim
WORKDIR "/app"
COPY package.json ./
RUN npm install knex -g
RUN npm install typescript -g
RUN npm install
COPY . .
RUN tsc
COPY ./build .
CMD ["npm", "run", "host"]
EXPOSE 3001