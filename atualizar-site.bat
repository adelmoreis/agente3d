@echo off
cd /d "%~dp0"
echo.
echo ========================================================
echo   3DIGITOS - ATUALIZACAO EXPRESSA DO SITE (agente3d.net)
echo ========================================================
echo.
set "PATH=C:\Users\tresd\AppData\Local\Programs\MinGit\cmd;C:\Users\tresd\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"
echo [1/4] Verificando arquivos alterados...
git add .
echo.
echo [2/4] Salvando pacote de atualizacao...
git commit -m "Atualizacao automatica do site"
echo.
echo [3/4] Enviando para o GitHub (adelmoreis/agente3d)...
git push origin main
echo.
echo [4/4] Avisando o servidor da Hostinger (agente3d.net)...
curl.exe -s https://agente3d.net/api/sync-github >nul 2>&1
echo.
echo ========================================================
echo   SUCESSO! Site enviado ao GitHub e sincronizado:
echo   https://agente3d.net
echo ========================================================
echo.
pause