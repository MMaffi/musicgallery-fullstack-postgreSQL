#!/bin/bash

echo "Instalando dependências com --legacy-peer-deps..."
npm install --legacy-peer-deps

echo "Executando build..."
npm run build