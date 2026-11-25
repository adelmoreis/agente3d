@echo off
chcp 65001 >nul
cd /d "%~dp0.."
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

echo.
echo [1/4] Salvando e enviando para o repositório principal (agente3d)...
git add -A
git commit -m "feat: atualizacao aprovada do localhost para producao"
git push origin main

echo.
echo [2/4] Sincronizando repositório específico do n8n para o Coolify...
if not exist "tmp_n8n_pub" (
    git clone --depth 1 https://github.com/adelmoreis/curso-n8n.git tmp_n8n_pub
) else (
    cd tmp_n8n_pub && git pull && cd ..
)
xcopy /E /I /Y "cursos\n8n\*" "tmp_n8n_pub\" /EXCLUDE:cursos\n8n\dados
cd tmp_n8n_pub
git add -A
git commit -m "feat: sincronizacao com codigo testado e aprovado no localhost"
git push origin main
cd ..
rmdir /s /q tmp_n8n_pub

echo.
echo [3/4] Avisando o servidor da Hostinger (agente3d.net)...
curl.exe -s -X POST https://agente3d.net/api/sync-github >nul 2>&1

echo.
echo ========================================================
echo   SUCESSO! Código enviado para o GitHub e VPS!
echo   Se o Coolify não atualizar sozinho em 1 min:
echo   Abra o Coolify e clique em "Redeploy" no Curso N8N.
echo ========================================================
echo.
pause
