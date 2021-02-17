FROM node:14-slim
WORKDIR "/app"
COPY package.json ./
RUN npm install serve
RUN npm install
COPY . .
COPY ./build .
RUN npm run build
CMD ["npm", "run", "serve"]
EXPOSE 3000