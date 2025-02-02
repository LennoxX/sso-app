#!/bin/sh

echo "Verificando certificados SSL..."

# Verifica se os certificados existem e copia para o local correto
if [ -f "/certs/lucaslabs.crt" ] && [ -f "/certs/lucaslabs.key" ]; then
    echo "Certificados encontrados. Copiando para /etc/nginx/certs..."
    cp /certs/lucaslabs.crt /etc/nginx/certs/server.crt
    cp /certs/lucaslabs.key /etc/nginx/certs/server.key
else
    echo "ERRO: Certificados SSL não encontrados em /certs"
    exit 1
fi

echo "Iniciando o Nginx..."
exec nginx -g "daemon off;"