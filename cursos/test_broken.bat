@echo off
set /p CONFIRMA="Deseja publicar no ar agora? (S/N): "
if /i not "%CONFIRMA%"=="S" (
    echo CANCELADO
    exit /b 1
)
echo CONFIRMADO
