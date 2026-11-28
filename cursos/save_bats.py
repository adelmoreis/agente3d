content = """@echo off
chcp 65001 >nul
title Publicar Cursos - Agente3D
echo ========================================================
echo   PUBLICAR ALTERACOES DOS CURSOS NO AR (PRODUCAO)
echo ========================================================
echo.

python "%~dp0publicar_producao.py"

echo.
pause
"""

content_crlf = content.replace("\r\n", "\n").replace("\n", "\r\n")

with open(r"c:\Users\tresd\OneDrive\3Digitos\3digitos\cursos\PUBLICAR_CURSOS.bat", "wb") as f:
    f.write(content_crlf.encode("utf-8"))

n8n_content = """@echo off
chcp 65001 >nul
title Publicar Cursos - Agente3D
call "%~dp0..\\PUBLICAR_CURSOS.bat"
"""
n8n_crlf = n8n_content.replace("\r\n", "\n").replace("\n", "\r\n")

with open(r"c:\Users\tresd\OneDrive\3Digitos\3digitos\cursos\n8n\PUBLICAR_CURSOS.bat", "wb") as f:
    f.write(n8n_crlf.encode("utf-8"))

print("Saved both .bat files successfully!")
