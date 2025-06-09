@echo off
echo ====================================
echo Gabriel - Setup Windows
echo ====================================

echo.
echo 1. Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo Node.js encontrado!
    node --version
)

echo.
echo 2. Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado!
    pause
    exit /b 1
) else (
    echo npm encontrado!
    npm --version
)

echo.
echo 3. Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo AVISO: Docker nao encontrado!
    echo Baixe em: https://desktop.docker.com/win/stable/Docker Desktop Installer.exe
) else (
    echo Docker encontrado!
    docker --version
)

echo.
echo 4. Instalando dependencias do backend...
npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend!
    pause
    exit /b 1
)

echo.
echo 5. Configurando arquivo .env...
if not exist .env (
    copy docs\env-windows-example.txt .env
    echo Arquivo .env criado! Configure suas variaveis.
) else (
    echo Arquivo .env ja existe.
)

echo.
echo 6. Instalando dependencias do frontend...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend!
    pause
    exit /b 1
)

echo.
echo 7. Configurando Prisma...
cd ..
npx prisma generate
if %errorlevel% neq 0 (
    echo ERRO: Falha ao gerar Prisma client!
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup concluido com sucesso!
echo ====================================
echo.
echo Proximos passos:
echo 1. Configure o arquivo .env
echo 2. Inicie o banco: docker-compose up -d db
echo 3. Execute as migracoes: npx prisma db push
echo 4. Inicie o backend: npm run dev
echo 5. Inicie o frontend: cd frontend ^&^& npm run dev
echo.
pause 