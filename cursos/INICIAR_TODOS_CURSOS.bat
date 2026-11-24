@echo off
chcp 65001 >nul
title Central de Cursos - Agente3D
echo ========================================================
echo   INICIANDO AMBIENTES DE CURSOS - AGENTE3D
echo ========================================================
echo   [1/2] Curso n8n:      http://localhost:8080
echo   [2/2] Curso Chatwoot: http://localhost:8081
echo ========================================================

start "Curso n8n (8080)" cmd /k "cd /d \"%~dp0n8n\" && set PORT=8080 && python servidor_dados.py 8080"
timeout /t 2 >nul
start "Curso Chatwoot (8081)" cmd /k "cd /d \"%~dp0chatwoot\" && set PORT=8081 && python servidor_dados.py 8081"

timeout /t 2 >nul
start http://localhost:8080
start http://localhost:8081
