@echo off
cd /d "%~dp0"
echo.
echo ========================================================
echo   3DIGITOS - ATUALIZACAO EXPRESSA DO SITE (agente3d.net)
echo ========================================================
echo.
set "PATH=C:\Users\tresd\AppData\Local\Programs\MinGit\cmd;C:\Users\tresd\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"
echo [1/3] Verificando arquivos alterados...
git add .
echo.
echo [2/3] Salvando pacote de atualizacao...
git commit -m "Atualizacao automatica do site"
echo.
echo [3/3] Enviando para o GitHub (adelmoreis/agente3d)...
git push origin main
echo.
echo ========================================================
echo   SUCESSO! Arquivos enviados para o GitHub:
echo   https://github.com/adelmoreis/agente3d
echo ========================================================
echo.
timeout /t 5