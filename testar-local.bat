@echo off
cd /d "%~dp0"
echo.
echo ========================================================
echo   3DIGITOS - SERVIDOR DE TESTES LOCAL (LOCALHOST)
echo ========================================================
echo.
echo Iniciando servidor local...
echo Abrindo navegador em: http://localhost:13080
echo.
echo DICA PARA TESTAR NO CELULAR:
echo Conecte o celular no mesmo Wi-Fi deste PC e acesse o
echo IP local da sua maquina com a porta :13080
echo.
echo (Para encerrar o teste, feche esta janela)
echo.
start http://localhost:13080
node server.js