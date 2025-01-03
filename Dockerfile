FROM node:latest
WORKDIR /api

COPY . .

# Copiando o package.json e o package-lock.json (ou yarn.lock, se usar yarn) primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Remover a pasta node_modules e a dist 
RUN rm -rf node_modules dist
# Instalar as dependências do projeto
RUN npm install

# Rodar o comando de build 
RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 3000