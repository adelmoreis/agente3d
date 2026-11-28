import subprocess

test_bat = """@echo off
set /p CONFIRMA="Deseja publicar no ar agora? (S/N): "
if /i not "%CONFIRMA%"=="S" (
    echo CANCELADO
    exit /b 1
)
echo CONFIRMADO
"""

with open("c:/Users/tresd/OneDrive/3Digitos/3digitos/cursos/test_broken.bat", "w", encoding="ascii") as f:
    f.write(test_bat)

r = subprocess.run(["cmd.exe", "/c", "echo S| c:\\Users\\tresd\\OneDrive\\3Digitos\\3digitos\\cursos\\test_broken.bat"], capture_output=True, text=True)
print("Return code:", r.returncode)
print("Stdout:", r.stdout)
print("Stderr:", r.stderr)
