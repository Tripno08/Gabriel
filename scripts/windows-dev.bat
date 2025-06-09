@echo off
echo ====================================
echo Gabriel - Iniciando Desenvolvimento
echo ====================================

echo.
echo Verificando servicos...

echo.
echo 1. Iniciando banco de dados...
docker-compose up -d db
if %errorlevel% neq 0 (
    echo ERRO: Falha ao iniciar banco de dados!
    echo Verifique se o Docker esta rodando.
    pause
    exit /b 1
)

echo.
echo 2. Aguardando banco inicializar...
timeout /t 5 /nobreak >nul

echo.
echo 3. Executando migracoes...
npx prisma db push
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar migracoes!
    pause
    exit /b 1
)

echo.
echo 4. Iniciando backend...
start "Gabriel Backend" cmd /k "npm run dev"

echo.
echo 5. Aguardando backend inicializar...
timeout /t 3 /nobreak >nul

echo.
echo 6. Iniciando frontend...
start "Gabriel Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ====================================
echo Desenvolvimento iniciado!
echo ====================================
echo.
echo Servicos rodando:
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:5173
echo - Banco: postgresql://localhost:5432
echo.
echo Para parar os servicos:
echo - Feche as janelas do terminal
echo - Execute: docker-compose down
echo.
pause 