@echo off
cd /d "%~dp0"
echo Gravador de voz em http://localhost:8081/gravador.html
echo Deixe esta janela aberta enquanto grava. Para parar, feche-a.
echo (Feche o INICIAR.bat antes: os dois usam a porta 8081.)
start "" "http://localhost:8081/gravador.html"
python servidor_vendas.py || py servidor_vendas.py
pause
