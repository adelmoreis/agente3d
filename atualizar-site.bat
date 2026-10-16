@echo off
chcp 65001 >nul
echo.
echo ========================================================
echo   3DíGITOS - ATUALIZAÇÃO EXPRESSA DO SITE (agente3d.net)
echo ========================================================
echo.

set GIT_PATH="C:\Users\tresd\AppData\Local\Programs\MinGit\cmd\git.exe"

%GIT_PATH% remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [ATENÇÃO] O link do seu repositório no GitHub ainda não foi vinculado!
    echo.
    echo Para vincular, basta criar o repositório no GitHub e me enviar o link
    echo no chat do Antigravity (ex: https://github.com/usuario/agente3d.git).
    echo.
    echo Pressione qualquer tecla para fechar esta janela...
    pause >nul
    exit /b
)

echo [1/3] Adicionando arquivos alterados...
%GIT_PATH% add .

echo [2/3] Criando pacote de atualização...
%GIT_PATH% commit -m "Atualização do site: %date% %time%"

echo [3/3] Enviando para o GitHub e Coolify...
%GIT_PATH% push origin main

echo.
echo ========================================================
echo   ✅ SUCESSO!
echo   Os arquivos foram enviados para o GitHub.
echo   O Coolify está aplicando a nova versão no ar em:
echo   👉 https://agente3d.net
echo ========================================================
echo.
timeout /t 5
