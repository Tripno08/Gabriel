#!/bin/bash

echo "🚀 Gabriel - Build e Deploy do App Nativo Android"
echo "================================================"

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
    cd .. && npm run dev &
    sleep 5
    cd frontend
fi

# Build do frontend
echo "🎨 Fazendo build do frontend..."
npm run build

# Sync com Capacitor
echo "🔄 Sincronizando com Capacitor..."
npx cap sync android

# Build do Android
echo "📱 Fazendo build do Android..."
cd android
./gradlew assembleDebug --no-daemon

# Instalar no emulador
echo "📲 Instalando no emulador..."
adb install app/build/outputs/apk/debug/app-debug.apk

# Abrir o app
echo "🚀 Abrindo o app..."
adb shell am start -n io.github.gabriel/.MainActivity

echo ""
echo "✅ App instalado e aberto no emulador!"
echo ""
echo "📋 Comandos úteis:"
echo "   - Reinstalar: adb install -r app/build/outputs/apk/debug/app-debug.apk"
echo "   - Abrir app: adb shell am start -n io.github.gabriel/.MainActivity"
echo "   - Logs: adb logcat | grep Gabriel"
echo "   - Screenshot: adb shell screencap -p /sdcard/screenshot.png && adb pull /sdcard/screenshot.png"
echo ""
echo "🔧 Para desenvolvimento:"
echo "   - Hot reload: npx cap run android"
echo "   - Debug: npx cap open android (abre Android Studio)" 