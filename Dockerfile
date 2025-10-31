FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm i
COPY src ./src
EXPOSE 8788
CMD ["npm","run","dev"]
