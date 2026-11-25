@echo off
chcp 65001 >nul
title Publicar Cursos - Agente3D
echo ========================================================
echo   PUBLICAR ALTERAÇÕES DOS CURSOS NO AR (PRODUÇÃO)
echo ========================================================
echo.
echo Atenção:
echo Esta rotina vai enviar tudo o que você testou no Localhost
echo para os repositórios oficiais e sincronizar a nuvem.
echo.
set /p CONFIRMA="Deseja publicar no ar agora? (S/N): "
if /i not "%CONFIRMA%"=="S" (
    echo [CANCELADO] Publicação cancelada. O Localhost continua ativo.
    pause
    exit /b
)

python "%~dp0publicar_producao.py"

echo.
pause
