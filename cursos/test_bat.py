import subprocess

res = subprocess.run(["cmd.exe", "/c", "echo S | c:\\Users\\tresd\\OneDrive\\3Digitos\\3digitos\\cursos\\PUBLICAR_CURSOS.bat"], capture_output=True, text=True, encoding="utf-8", errors="replace")
print("RETURN CODE:", res.returncode)
print("STDOUT:")
print(res.stdout)
print("STDERR:")
print(res.stderr)
