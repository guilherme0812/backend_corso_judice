FROM node:latest
WORKDIR /api

COPY . .

RUN rm -rf node_modules dist
# Instalar as dependências do projeto
RUN npm install
# Rodar o comando de build
RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 3000