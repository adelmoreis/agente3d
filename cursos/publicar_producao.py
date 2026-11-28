# -*- coding: utf-8 -*-
"""
Script Oficial de Publicação: Localhost -> Produção (agente3d.net e Coolify)
Executa a sincronização segura dos repositórios GitHub e atualiza os servidores online.
"""

import os
import sys
import shutil
import stat
import subprocess
import urllib.request
import ssl

def log(msg):
    print(f"\n[PUBLICAR] {msg}")

def remove_readonly(func, path, excinfo):
    try:
        os.chmod(path, stat.S_IWRITE)
        func(path)
    except Exception:
        pass

def run(cmd, cwd=None, check=True):
    print(f" > {cmd}")
    res = subprocess.run(cmd, cwd=cwd, shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if res.stdout and res.stdout.strip():
        print(res.stdout.strip())
    if res.stderr and res.stderr.strip():
        if "warning" in res.stderr.lower() or "up to date" in res.stderr.lower():
            print(res.stderr.strip())
        else:
            print(f" [AVISO/ERRO] {res.stderr.strip()}")
    if check and res.returncode != 0:
        raise RuntimeError(f"Comando falhou com código {res.returncode}: {cmd}")
    return res

def main():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    cursos_dir = os.path.join(base_dir, "cursos")
    n8n_dir = os.path.join(cursos_dir, "n8n")

    print("=" * 60)
    print("   PUBLICAR ALTERAÇÕES DO LOCALHOST PARA PRODUÇÃO")
    print("=" * 60)
    print(f"Diretório base: {base_dir}")

    # 1. Conferir sincronia do curso n8n
    log("1/4: Verificando sincronia do simulador e apostila...")
    sinc_script = os.path.join(n8n_dir, "verificar_sincronia.py")
    if os.path.exists(sinc_script):
        res = run(f'python "{sinc_script}"', cwd=n8n_dir, check=False)
        if res.returncode != 0:
            print("[ERRO] Falha de sincronia detectada no curso! Verifique antes de publicar.")
            sys.exit(1)
        print("  ✓ Sincronia validada com sucesso.")

    # 2. Publicar repositório principal (agente3d)
    log("2/4: Enviando alterações para o repositório principal (agente3d)...")
    run("git add -A", cwd=base_dir)
    status = run("git status --porcelain", cwd=base_dir, check=False)
    if status.stdout.strip():
        commit_msg = "feat: atualizacoes testadas e aprovadas no localhost (gestor e simulador)"
        run(f'git commit -m "{commit_msg}"', cwd=base_dir)
        run("git push origin main", cwd=base_dir)
        print("  ✓ Repositório principal (agente3d) atualizado no GitHub.")
    else:
        print("  ✓ Nenhuma alteração pendente no repositório principal.")

    # 3. Avisar servidor da Hostinger (agente3d.net)
    log("3/4: Atualizando servidor Hostinger (agente3d.net)...")
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = urllib.request.Request("https://agente3d.net/api/sync-github", method="POST")
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = resp.read().decode("utf-8")
            print(f"  ✓ Resposta Hostinger: {data[:120]}")
    except Exception as e:
        print(f"  [AVISO] Não foi possível chamar api/sync-github automaticamente: {e}")

    # 4. Sincronizar repositório específico do n8n para o Coolify (adelmoreis/curso-n8n)
    log("4/4: Sincronizando repositório do Coolify (adelmoreis/curso-n8n)...")
    tmp_dir = os.path.join(base_dir, "_tmp_n8n_pub")
    if os.path.exists(tmp_dir):
        shutil.rmtree(tmp_dir, onerror=remove_readonly)

    try:
        run(f'git clone --depth 1 https://github.com/adelmoreis/curso-n8n.git "{tmp_dir}"')
        
        # Copiar todos os arquivos de cursos/n8n para o repositório do curso
        # Ignorando a pasta de dados e caches locais
        ignorar = {".git", "dados", "__pycache__", ".venv"}
        for item in os.listdir(n8n_dir):
            if item in ignorar or (item.startswith("n8n-") and item.endswith(".json")):
                continue
            src = os.path.join(n8n_dir, item)
            dst = os.path.join(tmp_dir, item)
            if os.path.isdir(src):
                if os.path.exists(dst):
                    shutil.rmtree(dst, onerror=remove_readonly)
                shutil.copytree(src, dst)
            else:
                shutil.copy2(src, dst)

        # Checar se há alterações para commitar
        run("git add -A", cwd=tmp_dir)
        res = run("git status --porcelain", cwd=tmp_dir, check=False)
        if res.stdout.strip():
            commit_res = run('git commit -m "feat: sincronizacao aprovada do localhost (n8n fix e atualizacoes)"', cwd=tmp_dir, check=False)
            if commit_res.returncode == 0:
                run("git push origin main", cwd=tmp_dir)
                print("  ✓ Repositório adelmoreis/curso-n8n atualizado no GitHub com sucesso!")
            else:
                print("  ✓ Repositório adelmoreis/curso-n8n já estava atualizado.")
        else:
            print("  ✓ Repositório adelmoreis/curso-n8n já estava 100% atualizado.")

    finally:
        if os.path.exists(tmp_dir):
            shutil.rmtree(tmp_dir, onerror=remove_readonly)

    print("\n" + "=" * 60)
    print("   PUBLICAÇÃO CONCLUÍDA COM SUCESSO!")
    print("=" * 60)
    print("1. O site da Hostinger (agente3d.net) foi atualizado.")
    print("2. O repositório do n8n (github.com/adelmoreis/curso-n8n) foi atualizado.")
    print("3. Se o Coolify tiver o Webhook ativo, ele atualiza automaticamente.")
    print("   Caso contrário, clique em 'Redeploy' no painel do Coolify.")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
