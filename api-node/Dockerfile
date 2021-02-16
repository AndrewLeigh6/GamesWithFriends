FROM node:slim
WORKDIR "/app"
COPY package.json ./
RUN npm install knex -g
RUN npm install
COPY . .
CMD ["npm", "run", "host"]
EXPOSE 3001