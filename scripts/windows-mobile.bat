@echo off
echo ====================================
echo Gabriel - Mobile Development Windows
echo ====================================

echo.
echo Verificando pre-requisitos...

echo.
echo 1. Verificando Android SDK...
if "%ANDROID_HOME%"=="" (
    echo ERRO: ANDROID_HOME nao configurado!
    echo Configure: ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
    pause
    exit /b 1
) else (
    echo ANDROID_HOME: %ANDROID_HOME%
)

echo.
echo 2. Verificando adb...
adb version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: adb nao encontrado no PATH!
    echo Adicione %ANDROID_HOME%\platform-tools ao PATH
    pause
    exit /b 1
) else (
    echo adb encontrado!
)

echo.
echo 3. Verificando emulador...
emulator -list-avds >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: emulator nao encontrado!
    echo Adicione %ANDROID_HOME%\emulator ao PATH
    pause
    exit /b 1
)

echo.
echo 4. Listando AVDs disponiveis...
emulator -list-avds

echo.
echo 5. Building frontend...
cd frontend
npm run build
if %errorlevel% neq 0 (
    echo ERRO: Falha ao buildar frontend!
    pause
    exit /b 1
)

echo.
echo 6. Sincronizando com Capacitor...
npx cap sync android
if %errorlevel% neq 0 (
    echo ERRO: Falha ao sincronizar Capacitor!
    pause
    exit /b 1
)

echo.
echo 7. Opcoes disponiveis:
echo.
echo [1] Abrir no Android Studio
echo [2] Iniciar emulador
echo [3] Build APK Debug
echo [4] Instalar no dispositivo
echo [0] Sair
echo.

set /p choice="Escolha uma opcao: "

if "%choice%"=="1" (
    echo Abrindo Android Studio...
    npx cap open android
) else if "%choice%"=="2" (
    set /p avd="Digite o nome do AVD: "
    echo Iniciando emulador %avd%...
    start emulator -avd %avd%
) else if "%choice%"=="3" (
    echo Building APK Debug...
    cd android
    gradlew assembleDebug
    echo APK gerado em: android\app\build\outputs\apk\debug\app-debug.apk
) else if "%choice%"=="4" (
    echo Verificando dispositivos conectados...
    adb devices
    echo.
    set /p confirm="Instalar no dispositivo? (y/n): "
    if /i "%confirm%"=="y" (
        cd android
        gradlew installDebug
    )
) else (
    echo Saindo...
)

cd ..
echo.
pause 