FROM node:14-slim
WORKDIR "/app"
COPY package.json ./
RUN npm install serve
RUN npm install
COPY . .
RUN npm run build
COPY ./build .
CMD ["npm", "run", "serve"]
EXPOSE 3000