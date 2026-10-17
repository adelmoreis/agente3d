@echo off
cd /d "%~dp0"
echo.
echo ========================================================
echo   3DIGITOS - SERVIDOR DE TESTES LOCAL (LOCALHOST)
echo ========================================================
echo.
echo Servidor de testes local ATIVO!
echo.
echo - No computador / notebook acesse:
echo   http://localhost:13080
echo   http://localhost:13080/admin.html
echo.
echo - No seu CELULAR (no mesmo Wi-Fi deste PC) acesse:
echo   http://192.168.1.76:13080
echo   http://192.168.1.76:13080/admin.html
echo.
echo --------------------------------------------------------
echo   NADA AQUI AFETA O SITE OFICIAL (agente3d.net)
echo   Pode testar no seu celular sem risco algum!
echo --------------------------------------------------------
echo (Para encerrar este servidor de testes, feche esta janela)
echo.
start http://localhost:13080
node server.js