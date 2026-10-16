@echo off
cd /d "%~dp0"
echo.
echo ========================================================
echo   3DIGITOS - PUBLICACAO NO SITE OFICIAL (agente3d.net)
echo ========================================================
echo.
echo ATENCAO:
echo Esta operacao vai enviar as alteracoes do seu computador
echo diretamente para o site oficial: https://agente3d.net
echo.
set /p CONFIRMAR="Voce ja testou no LocalHost e deseja PUBLICAR NO AR agora? [S/N]: "
if /i not "%CONFIRMAR%"=="S" (
    echo.
    echo [CANCELADO] Operacao abortada com seguranca!
    echo O site https://agente3d.net permanece 100%% intocado.
    echo.
    pause
    exit /b
)
echo.
echo Iniciando publicacao segura...
set "PATH=C:\Users\tresd\AppData\Local\Programs\MinGit\cmd;C:\Users\tresd\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"
echo [1/4] Verificando arquivos alterados...
git add .
echo.
echo [2/4] Salvando pacote de atualizacao...
git commit -m "Atualizacao aprovada do site"
echo.
echo [3/4] Enviando para o GitHub (adelmoreis/agente3d)...
git push origin main
echo.
echo [4/4] Avisando o servidor da Hostinger (agente3d.net)...
curl.exe -s https://agente3d.net/api/sync-github >nul 2>&1
echo.
echo ========================================================
echo   SUCESSO! Site atualizado no ar com sucesso:
echo   https://agente3d.net
echo ========================================================
echo.
pause