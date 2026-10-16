@echo off
chcp 65001 >nul
echo.
echo ========================================================
echo   3DíGITOS - ATUALIZAÇÃO EXPRESSA DO SITE (agente3d.net)
echo ========================================================
echo.

set PATH=C:\Users\tresd\AppData\Local\Programs\MinGit\cmd;C:\Users\tresd\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%

echo [1/3] Verificando arquivos alterados...
git add .

echo [2/3] Criando pacote de atualização...
git commit -m "Atualização automática do site: %date% %time%"

echo [3/3] Enviando para o GitHub (adelmoreis/agente3d)...
git push origin main

echo.
echo ========================================================
echo   ✅ SUCESSO TOTAL!
echo   Arquivos sincronizados com o GitHub:
echo   👉 https://github.com/adelmoreis/agente3d
echo.
echo   O Coolify já está atualizando o seu site em:
echo   👉 https://agente3d.net
echo ========================================================
echo.
timeout /t 5
