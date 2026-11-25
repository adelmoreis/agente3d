import os, subprocess

html_content = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Guia Oficial de Links & Infraestrutura - Agente3D</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  @page {
    size: A4;
    margin: 12mm 15mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1e293b;
    margin: 0;
    padding: 0;
    background: #fff;
    font-size: 13px;
    line-height: 1.5;
  }
  .header {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #31104b 100%);
    color: #fff;
    padding: 24px 28px;
    border-radius: 14px;
    margin-bottom: 20px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .brand-badge {
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
    padding: 3px 10px;
    border-radius: 99px;
  }
  .header h1 {
    margin: 0 0 4px;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .header p {
    margin: 0;
    color: #cbd5e1;
    font-size: 12px;
  }
  .section-title {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 20px 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 6px;
  }
  .section-title span.badge {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 6px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .badge-online { background: #dcfce7; color: #166534; }
  .badge-local { background: #fef3c7; color: #92400e; }
  .badge-sec { background: #f3e8ff; color: #6b21a8; }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 14px;
    font-size: 12px;
  }
  th {
    background: #f8fafc;
    color: #475569;
    font-weight: 700;
    text-align: left;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  td {
    padding: 9px 12px;
    border: 1px solid #e2e8f0;
    vertical-align: middle;
  }
  tr:nth-child(even) td {
    background: #fafafa;
  }
  a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 600;
    word-break: break-all;
  }
  a:hover {
    text-decoration: underline;
  }
  .tag {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
  }
  .tag-n8n { background: #eeecff; color: #4338ca; border: 1px solid #c7d2fe; }
  .tag-cw { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
  .tag-main { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
  .tag-bot { background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; }
  
  .card-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 12px;
  }
  .card-box h3 {
    margin: 0 0 6px;
    font-size: 13px;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .cred-box {
    background: #f5f3ff;
    border: 1px dashed #8b5cf6;
    border-radius: 10px;
    padding: 12px 16px;
  }
  .cred-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid rgba(139,92,246,0.15);
    font-size: 12px;
  }
  .cred-item:last-child { border-bottom: none; }
  .cred-item b { color: #5b21b6; }
  
  .footer {
    margin-top: 24px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    color: #94a3b8;
    font-size: 11px;
  }
</style>
</head>
<body>

<div class="header">
  <div class="header-top">
    <span class="brand-badge">Documento Oficial</span>
    <span style="font-size:11px; color:#cbd5e1;">Emissão: 25/11/2026</span>
  </div>
  <h1>Central de Links & Infraestrutura - Agente3D</h1>
  <p>Todos os acessos da plataforma, cursos online (Coolify/VPS), simuladores e ambientes de desenvolvimento.</p>
</div>

<!-- SEÇÃO 1: NUVEM / PRODUÇÃO -->
<div class="section-title">
  🌐 Ambientes Online em Produção (VPS / Coolify)
  <span class="badge badge-online">SSL 100% Ativo</span>
</div>

<table>
  <thead>
    <tr>
      <th style="width:20%">Plataforma</th>
      <th style="width:15%">Curso / Tipo</th>
      <th style="width:40%">Link de Acesso Direto</th>
      <th style="width:25%">Finalidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Site Principal</b></td>
      <td><span class="tag tag-main">Portal Agente3D</span></td>
      <td><a href="https://agente3d.net" target="_blank">https://agente3d.net</a></td>
      <td>Site oficial da agência e vitrine de soluções</td>
    </tr>
    <tr>
      <td><b>Academia n8n</b></td>
      <td><span class="tag tag-n8n">Curso n8n</span></td>
      <td><a href="https://curson8n.agente3d.net" target="_blank">https://curson8n.agente3d.net</a></td>
      <td>Plataforma e simulador prático do aluno</td>
    </tr>
    <tr>
      <td><b>Painel do Gestor (Master)</b></td>
      <td><span class="tag tag-n8n">Multi-Cursos</span></td>
      <td><a href="https://curson8n.agente3d.net/gestor.html" target="_blank">https://curson8n.agente3d.net/gestor.html</a></td>
      <td>Painel unificado para gerenciar n8n e Chatwoot</td>
    </tr>
    <tr>
      <td><b>Apostila Inteligente n8n</b></td>
      <td><span class="tag tag-n8n">Curso n8n</span></td>
      <td><a href="https://curson8n.agente3d.net/apostila.html" target="_blank">https://curson8n.agente3d.net/apostila.html</a></td>
      <td>Material didático e suporte do aluno n8n</td>
    </tr>
    <tr>
      <td><b>Academia Chatwoot</b></td>
      <td><span class="tag tag-cw">Curso Chatwoot</span></td>
      <td><a href="https://cursochatwoot.agente3d.net" target="_blank">https://cursochatwoot.agente3d.net</a></td>
      <td>Plataforma e simulador prático do aluno</td>
    </tr>
    <tr>
      <td><b>Página de Vendas Chatwoot</b></td>
      <td><span class="tag tag-cw">Curso Chatwoot</span></td>
      <td><a href="https://cursochatwoot.agente3d.net/pagina-de-vendas.html" target="_blank">.../pagina-de-vendas.html</a></td>
      <td>Página de vendas oficial de alta conversão</td>
    </tr>
    <tr>
      <td><b>Apostila Chatwoot</b></td>
      <td><span class="tag tag-cw">Curso Chatwoot</span></td>
      <td><a href="https://cursochatwoot.agente3d.net/apostila.html" target="_blank">.../apostila.html</a></td>
      <td>Material didático e suporte do aluno Chatwoot</td>
    </tr>
    <tr>
      <td><b>Chatwoot Atendimento</b></td>
      <td><span class="tag tag-bot">Inbox Oficial</span></td>
      <td><a href="https://chatwoot.agente3d.net" target="_blank">https://chatwoot.agente3d.net</a></td>
      <td>Painel oficial de conversas e atendimento</td>
    </tr>
    <tr>
      <td><b>Webhook n8n Automação</b></td>
      <td><span class="tag tag-bot">Webhook n8n</span></td>
      <td><code>https://n8nai.agente3d.net/webhook/curso-whatsapp</code></td>
      <td>Automação de entrega de acessos e recuperação</td>
    </tr>
  </tbody>
</table>

<!-- SEÇÃO 2: DESENVOLVIMENTO LOCAL -->
<div class="section-title">
  💻 Ambientes Locais de Desenvolvimento (No seu PC)
  <span class="badge badge-local">Testes & Criação</span>
</div>

<table>
  <thead>
    <tr>
      <th style="width:25%">Ambiente</th>
      <th style="width:15%">Porta</th>
      <th style="width:35%">Link Local (Navegador)</th>
      <th style="width:25%">Comando / Arquivo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Iniciador Central</b></td>
      <td><span class="tag tag-main">8080 & 8081</span></td>
      <td>Inicia ambos os cursos com 1 clique</td>
      <td><code>cursos/INICIAR_TODOS_CURSOS.bat</code></td>
    </tr>
    <tr>
      <td><b>Curso n8n Local</b></td>
      <td><code>8080</code></td>
      <td><a href="http://localhost:8080" target="_blank">http://localhost:8080</a></td>
      <td><code>cursos/n8n/INICIAR.bat</code></td>
    </tr>
    <tr>
      <td><b>Gestor n8n Local</b></td>
      <td><code>8080</code></td>
      <td><a href="http://localhost:8080/gestor.html" target="_blank">http://localhost:8080/gestor.html</a></td>
      <td>Acesso direto ao Gestor Multi-Cursos</td>
    </tr>
    <tr>
      <td><b>Curso Chatwoot Local</b></td>
      <td><code>8081</code></td>
      <td><a href="http://localhost:8081" target="_blank">http://localhost:8081</a></td>
      <td><code>cursos/chatwoot/INICIAR.bat</code></td>
    </tr>
    <tr>
      <td><b>Vendas Chatwoot Local</b></td>
      <td><code>8081</code></td>
      <td><a href="http://localhost:8081/pagina-de-vendas.html" target="_blank">http://localhost:8081/pagina-de-vendas.html</a></td>
      <td>Página de vendas no PC</td>
    </tr>
  </tbody>
</table>

<!-- SEÇÃO 3: CREDENCIAIS & INFRA -->
<div class="grid-2">
  <div class="cred-box">
    <h3 style="margin:0 0 8px; color:#5b21b6; font-size:13px;">🔐 Credenciais do Painel de Gestor</h3>
    <div class="cred-item">
      <span>E-mail do Administrador:</span>
      <b>3digitos2023@gmail.com</b>
    </div>
    <div class="cred-item">
      <span>Senha Padrão:</span>
      <b>2683233d</b>
    </div>
    <div class="cred-item">
      <span>Segurança:</span>
      <span style="color:#059669; font-weight:700;">Banco de dados criptografado</span>
    </div>
    <p style="margin:8px 0 0; font-size:11px; color:#6b7280;">
      * A senha pode ser alterada a qualquer momento na aba <i>Configurações</i> do Painel do Gestor.
    </p>
  </div>

  <div class="card-box">
    <h3>⚙️ Dados da Infraestrutura VPS (Coolify)</h3>
    <div class="cred-item">
      <span>IP da VPS (Hostinger):</span>
      <b>187.77.61.93</b>
    </div>
    <div class="cred-item">
      <span>Painel Coolify:</span>
      <a href="http://187.77.61.93:8000" target="_blank">http://187.77.61.93:8000</a>
    </div>
    <div class="cred-item">
      <span>Repositório GitHub:</span>
      <a href="https://github.com/adelmoreis/agente3d" target="_blank">adelmoreis/agente3d</a>
    </div>
    <div class="cred-item">
      <span>Containers Ativos:</span>
      <b style="color:#059669;">Curso N8N & Curso Chatwoot</b>
    </div>
  </div>
</div>

<div class="footer">
  <span>Agente3D · 3Dígitos Soluções Inteligentes © 2026</span>
  <span>Documento gerado automaticamente pelo Assistente Antigravity</span>
</div>

</body>
</html>
"""

html_path = r"c:\Users\tresd\OneDrive\3Digitos\3digitos\cursos\guia_links.html"
pdf_path_1 = r"c:\Users\tresd\OneDrive\3Digitos\3digitos\cursos\GUIA_OFICIAL_LINKS_AGENTE3D.pdf"
pdf_path_2 = r"c:\Users\tresd\OneDrive\Desktop\GUIA_OFICIAL_LINKS_AGENTE3D.pdf"

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd = [
    edge_exe,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path_1}",
    html_path
]

print("Renderizando PDF via Edge headless...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Resultado:", res.returncode)

if os.path.exists(pdf_path_1):
    import shutil
    shutil.copy(pdf_path_1, pdf_path_2)
    print("PDF criado com sucesso nos dois destinos!")
    print("Tamanho:", os.path.getsize(pdf_path_1), "bytes")
else:
    print("Falha ao gerar PDF:", res.stderr)
