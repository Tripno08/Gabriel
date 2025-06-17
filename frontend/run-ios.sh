#!/bin/bash

echo "🚀 Preparando app iOS..."

# Compilar o frontend
echo "📦 Compilando o frontend..."
npm run build

# Sincronizar com iOS
echo "🔄 Sincronizando com iOS..."
npx cap sync ios

# Abrir no Xcode
echo "📱 Abrindo no simulador iOS..."
npx cap run ios

echo "✅ App iOS rodando!" 