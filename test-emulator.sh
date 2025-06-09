#!/bin/bash

echo "🚀 Testando Gabriel no Emulador Android"
echo "======================================="

# Verificar se o emulador está rodando
echo "📱 Verificando emulador..."
DEVICES=$(adb devices | grep -v "List of devices" | grep "device" | wc -l)

if [ $DEVICES -eq 0 ]; then
    echo "❌ Nenhum emulador encontrado. Iniciando emulador..."
    emulator -avd PixelEmulator &
    echo "⏳ Aguardando emulador inicializar..."
    sleep 30
else
    echo "✅ Emulador encontrado!"
fi

# Verificar se o backend está rodando
echo "🔧 Verificando backend..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Backend rodando na porta 3000"
else
    echo "❌ Backend não encontrado. Iniciando..."
    npm run dev &
    sleep 5
fi

# Verificar se o frontend está buildado
echo "🎨 Verificando build do frontend..."
if [ ! -d "frontend/dist" ]; then
    echo "❌ Build não encontrado. Fazendo build..."
    cd frontend && npm run build && cd ..
fi

# Iniciar servidor preview
echo "🌐 Iniciando servidor preview..."
cd frontend
npm run preview &
PREVIEW_PID=$!
cd ..

sleep 3

# Obter IP da máquina
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
echo "🌍 IP da máquina: $IP"

# Abrir no emulador
echo "📱 Abrindo PWA no emulador..."
adb shell am start -a android.intent.action.VIEW -d "http://$IP:4173"

echo ""
echo "✅ Aplicação aberta no emulador!"
echo "📋 URLs disponíveis:"
echo "   - Local: http://localhost:4173"
echo "   - Rede: http://$IP:4173"
echo ""
echo "🔧 Para instalar como PWA:"
echo "   1. Abra o Chrome no emulador"
echo "   2. Acesse http://$IP:4173"
echo "   3. Toque no menu (3 pontos)"
echo "   4. Selecione 'Adicionar à tela inicial'"
echo ""
echo "📸 Para fazer screenshot: adb shell screencap -p /sdcard/screenshot.png && adb pull /sdcard/screenshot.png"
echo ""
echo "⏹️  Para parar os servidores: kill $PREVIEW_PID" 