@echo off
chcp 65001 >nul
title Publicar Cursos - Agente3D
echo ========================================================
echo   PUBLICAR ALTERACOES DOS CURSOS NO AR (PRODUCAO)
echo ========================================================
echo.

python "%~dp0publicar_producao.py"

echo.
pause
