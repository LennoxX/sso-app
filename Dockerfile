# Etapa 1: Construção da aplicação Angular
FROM node:18 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Executa o build da aplicação Angular para produção
RUN npm run build --prod

# Etapa 2: Servindo a aplicação com nginx
FROM nginx:alpine

# Define o diretório de trabalho dentro do container
WORKDIR /

# Cria diretório para armazenar os certificados dentro do container
RUN mkdir -p /etc/nginx/certs

# Copia os arquivos da build gerada pela etapa anterior para o diretório do nginx
COPY --from=build /app/dist/sso-app/browser /usr/share/nginx/html

# Copia a configuração do nginx para incluir suporte a SSL
COPY nginx.conf /etc/nginx/nginx.conf

# Copia o script de inicialização
COPY init.sh /init.sh
RUN chmod +x /init.sh

# Expondo a porta 443 (HTTPS)
EXPOSE 443
# Expondo a porta 80 (HTTP) para redirecionamento
EXPOSE 80

# Define o entrypoint para garantir que os certificados existam antes de iniciar o Nginx
ENTRYPOINT ["/entrypoint.sh"]