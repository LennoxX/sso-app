# API Gateway

Este projeto configura uma APP **SSO** que pode ser utilizado para autenticar um usuário em diversas aplicações, utilizando o mesmo token. O APP é construído utilizando recursos do Angular e executado dentro de um container Docker. 

## Pré-requisitos

1. **Docker e Docker Compose**: Certifique-se de ter o Docker e o Docker Compose instalados no seu sistema.
   
2. **Certificados SSL**: Por questões de segurança, os certificados SSL não são versionados neste repositório. Você precisará gerar ou obter o certificado e a chave privada antes de realizar o deploy.

## Passos para Configuração

### 1. Criando o Arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` com as seguintes configurações:

```ini
VIRTUAL_HOST=
VIRTUAL_PORT=
VIRTUAL_DOMAIN=

```

- Sobre o arquivo `.env`: 
    * VIRTUAL_HOST: Nome do host utilizado para o proxy reverso.
    * VIRTUAL_PORT: Porta utilizada pelo proxy reverso.
    * VIRTUAL_DOMAIN: Nome de dominio usado

### 2. **Configuração dos Certificados SSL**
Os certificados não são versionados por questões de segurança. Você precisará fornecer o certificado e a chave privada no formato keystore.p12.

- Estrutura de Pastas:
    * Crie uma pasta chamada certificados em algum diretório do seu computador. (Certifique-se de atualizar o arquivo docker-compose.yml com o diretório criado)
    * Dentro da pasta certificados, crie uma subpasta (Ex.:.lucaslabs) onde os arquivos do certificado e chave serão armazenados.
    * O caminho completo seria:
      ```ini
      caminho/da/pasta/certificados/.lucaslabs/server.key e server.crt
    * Gere os arquivos .`crt` e `.key` na pasta. (Para gerar os certificados, você pode utilizar o mkcert (https://github.com/FiloSottile/mkcert)

### 4. **Build e Deploy**
Execute o comando 
```
docker-compose up -d
```

### 5. **Acessando a aplicação**
Adicione um DNS no arquivo `hosts`

`
127.0.0.1	sso-app.lucaslabs.com
`

### 6. Gerenciamento de Certificados e Truststore
Durante a construção da imagem, o script init.sh adiciona os certificados na pasta do nginx, que será usado pelo nginx.conf para habilitar o SSL e incluir os certificados nas requisições
