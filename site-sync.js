/**
 * 3Dígitos - Sincronizador de Conteúdos & Configurações da Vitrine
 * Sincroniza em tempo real as configurações salvas no painel com o site público.
 */

const DEFAULT_SITE_SETTINGS = {
    // 1. Contatos & Atendimento
    whatsapp: '5574991223727',
    whatsappMessage: 'Olá, gostaria de saber mais sobre as soluções e orçamentos da 3Dígitos!',

    // Chatwoot (atendimento omnichannel) - preencher com os dados do seu Chatwoot
    chatwootBaseUrl: 'https://chatwoot.agente3d.net',   // ex: https://chat.seudominio.com
    chatwootToken: 'W8HzHPJbmxXzVHn5Y4T9xhiB',     // Website Token da caixa de entrada "Website"
    phone: '(11) 99999-9999',
    email: '3digitos2023@gmail.com',
    address: 'Atendimento Nacional & Internacional (Remoto)',
    businessHours: 'Segunda a Sexta, das 09h às 18h',

    // 2. Redes Sociais
    instagramUrl: 'https://instagram.com/3digitos',
    linkedinUrl: 'https://linkedin.com/company/3digitos',
    youtubeUrl: 'https://youtube.com/@3digitos',
    githubUrl: 'https://github.com/3digitos',

    // 3. Banner Principal (Hero)
    heroTag: '🚀 IMPULSIONE SEU NEGÓCIO COM IA',
    heroTitle: 'Ideias Criativas, <br><span class="text-brandOrange drop-shadow-md">Resultados Reais</span>',
    heroDesc: 'Desenvolvemos soluções inteligentes em Tecnologia, Sistemas e Automação com IA. Transforme a visão da sua empresa em resultados fantásticos!',
    heroCtaText: 'Fazer um Orçamento',
    heroCtaType: 'whatsapp', // 'whatsapp' ou 'anchor'

    // 4. Barra de Alerta Superior (Comunicados)
    announcementEnabled: false,
    announcementText: '🔥 Novas vagas abertas para turmas da Sala de Estudos & Mentoria!',
    announcementLink: 'sala-estudos.html',

    // 5. Links de Projetos em Destaque
    rhinovaUrl: 'rhinova.html',
    rhinovaTag: 'RH & Inovação',
    rhinovaDesc: 'Gestão Inteligente de Pessoas, Ponto Eletrônico & Recrutamento',
    
    clinicaUrl: 'clinica.html',
    lukeUrl: 'luke.html',
    advogadosUrl: 'advogados.html'
};

const SiteSync = {
    LOCAL_KEY: 'portal_site_settings',

    // Obter as configurações atuais (com fallback para os padrões)
    getSettingsLocal() {
        try {
            const raw = localStorage.getItem(this.LOCAL_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                let updated = false;
                // Se ainda estiver com o localhost:8081 antigo, migra para a vitrine rhinova.html
                if (parsed.rhinovaUrl === 'http://localhost:8081' || !parsed.rhinovaUrl) {
                    parsed.rhinovaUrl = 'rhinova.html';
                    updated = true;
                }
                // Migra número placeholder antigo e tokens antigos do Chatwoot
                if (!parsed.whatsapp || parsed.whatsapp === '5599999999999') {
                    parsed.whatsapp = DEFAULT_SITE_SETTINGS.whatsapp;
                    updated = true;
                }
                if (!parsed.chatwootBaseUrl) {
                    parsed.chatwootBaseUrl = DEFAULT_SITE_SETTINGS.chatwootBaseUrl;
                    updated = true;
                }
                if (!parsed.chatwootToken || parsed.chatwootToken === 'cnsoWqY9xnWS9NZbKF2avLWX') {
                    parsed.chatwootToken = DEFAULT_SITE_SETTINGS.chatwootToken;
                    updated = true;
                }
                if (updated) {
                    localStorage.setItem(this.LOCAL_KEY, JSON.stringify(parsed));
                }
                return { ...DEFAULT_SITE_SETTINGS, ...parsed };
            }
        } catch (e) {
            console.warn('[SiteSync] Erro ao ler localStorage:', e);
        }
        return { ...DEFAULT_SITE_SETTINGS };
    },

    // Buscar configurações do servidor VPS (com fallback local transparente)
    async fetchSettings() {
        let settings = this.getSettingsLocal();
        try {
            // Tenta api.php (padrão Hostinger) ou /api/settings (Node.js)
            const endpoints = ['api.php?action=get_settings', '/api/settings'];
            for (const ep of endpoints) {
                try {
                    const res = await fetch(ep, { cache: 'no-store' });
                    if (res.ok) {
                        const json = await res.json();
                        if (json && json.success && json.data) {
                            settings = { ...DEFAULT_SITE_SETTINGS, ...json.data };
                            localStorage.setItem(this.LOCAL_KEY, JSON.stringify(settings));
                            break;
                        }
                    }
                } catch (err) {
                    // Endpoint não disponível localmente, tenta próximo
                }
            }
        } catch (e) {
            console.warn('[SiteSync] Usando cache local:', e);
        }
        return this.getSettingsLocal();
    },

    // Salvar configurações (local e no servidor se disponível)
    async saveSettings(newSettings) {
        const merged = { ...this.getSettingsLocal(), ...newSettings };
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(merged));

        let serverSaved = false;
        const endpoints = ['api.php?action=save_settings', '/api/settings'];

        for (const ep of endpoints) {
            try {
                const res = await fetch(ep, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(merged)
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.success) {
                        serverSaved = true;
                        break;
                    }
                }
            } catch (err) {
                // Falha de rede ou servidor estático
            }
        }

        return { success: true, serverSaved, data: merged };
    },

    // Integração Chatwoot Centralizada + Modal de Triagem 4 Opções 3Dígitos (com Protocolo Oficial e IA)
    _chatwootLoaded: false,
    _chatwootFailed: false,
    _pendingOpen: false,
    _delegatedBound: false,
    _triageModalBuilt: false,
    _chatwootAberto: false,
    _fechamentoSolicitado: false,
    _leadCadastrado: false,
    _opcaoCodigo: null,
    _opcaoTexto: '',
    _chatwootSourceId: null,
    _fallbackWaLink: 'https://wa.me/5574991223727',

    getWebhookUrl() {
        const host = ['n', '8', 'n', 'ai.agente3d.net'].join('');
        return `https://${host}/webhook/widget-lead-3digitos`;
    },

    obterChatwootSourceId() {
        if (this._chatwootSourceId) return this._chatwootSourceId;
        try {
            const match = document.cookie.match(/(?:^|;\s*)cw_conversation=([^;]+)/);
            if (match && match[1]) {
                this._chatwootSourceId = decodeURIComponent(match[1]);
                return this._chatwootSourceId;
            }
        } catch (_) {}
        return null;
    },

    obterOuGerarProtocolo() {
        try {
            let prot = sessionStorage.getItem('protocolo_3digitos_ativo');
            if (!prot) {
                const d = new Date();
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                prot = `3D-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
                sessionStorage.setItem('protocolo_3digitos_ativo', prot);
            }
            return prot;
        } catch (_) {
            const d = new Date();
            return `3D-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
        }
    },

    buildTriageModal() {
        if (this._triageModalBuilt || !document.body) return;
        const path = (window.location.pathname || '').toLowerCase();
        if (path.includes('admin') || path.includes('login') || path.includes('drive')) return;
        this._triageModalBuilt = true;

        const style = document.createElement('style');
        style.id = 'triageModal3DigitosStyles';
        style.textContent = `
            .woot-widget-holder, .woot-widget-bubble, .woot--bubble-holder { z-index: 2147483645 !important; }
            .woot-widget-holder.chat-oculto { display: none !important; }
            .woot-widget-holder.chat-ativo-visivel { display: block !important; visibility: visible !important; opacity: 1 !important; z-index: 2147483646 !important; }
            #btn-retornar-triagem-3d {
                display: none; position: fixed; top: 14px; right: 24px; z-index: 2147483647 !important;
                background: linear-gradient(135deg, #047857, #10b981); color: #ffffff;
                border: 1.5px solid #34d399; border-radius: 999px; padding: 9px 18px;
                font-size: 12.5px; font-weight: 800; cursor: pointer; align-items: center; gap: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.35); transition: all 0.2s ease; font-family: 'Inter', sans-serif;
            }
            #btn-retornar-triagem-3d:hover { background: #f97316; border-color: #fdba74; transform: translateY(-1px); }
            #janela-modal-3digitos {
                display: none; position: fixed; bottom: 96px; right: 24px; width: 390px;
                max-width: calc(100vw - 32px); background: #0b1324; border: 1.5px solid #10b981;
                border-radius: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(16,185,129,0.2);
                overflow: hidden; z-index: 2147483647 !important; flex-direction: column;
                font-family: 'Inter', sans-serif; animation: modal3dFadeIn 0.22s ease-out;
            }
            @keyframes modal3dFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
            .modal3d-topo {
                padding: 16px 18px; display: flex; justify-content: space-between; align-items: flex-start;
                border-bottom: 1px solid #1e293b; background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%);
            }
            .modal3d-topo h4 { margin: 0; color: #ffffff; font-size: 15px; font-weight: 800; letter-spacing: -0.2px; }
            .modal3d-topo span { font-size: 11px; color: #fb923c; font-weight: 600; display: block; margin-top: 3px; }
            .btn3d-fechar { background: none; border: none; color: #94a3b8; font-size: 22px; line-height: 1; cursor: pointer; padding: 2px 6px; }
            .btn3d-fechar:hover { color: #ffffff; }
            .modal3d-conteudo { padding: 16px 18px; max-height: 72vh; overflow-y: auto; }
            .modal3d-boasvindas { font-size: 13px; color: #cbd5e1; margin: 0 0 12px 0; line-height: 1.45; }
            .modal3d-opcoes { display: flex; flex-direction: column; gap: 8px; }
            .btn3d-opcao {
                width: 100%; background: #131f38; border: 1px solid #1e293b; color: #f1f5f9;
                padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 600;
                text-align: left; cursor: pointer; transition: all 0.2s ease;
                display: flex; align-items: center; justify-content: space-between;
            }
            .btn3d-opcao:hover, .btn3d-opcao.ativo {
                background: #1a2c4e; border-color: #f97316; color: #fdba74; transform: translateX(2px);
            }
            .btn3d-opcao-zap { background: #064e3b; border-color: #10b981; color: #d1fae5; }
            .btn3d-opcao-zap:hover { background: #047857; border-color: #34d399; color: #ffffff; }
            #area3d-dados-lead { display: none; margin-top: 10px; padding-top: 12px; border-top: 1px dashed rgba(255,255,255,0.12); }
            .contexto3d-passo2 {
                font-size: 12px; color: #6ee7b7; background: rgba(16,185,129,0.1);
                border-left: 3px solid #10b981; padding: 8px 10px; border-radius: 6px; margin-bottom: 12px; line-height: 1.4;
            }
            .grupo3d-inputs { display: flex; flex-direction: column; gap: 10px; }
            .label3d-lead { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 3px; display: block; }
            .input3d-chat {
                width: 100%; background: #0f172a; border: 1px solid #334155; border-radius: 10px;
                padding: 10px 12px; color: #f8fafc; font-size: 13px; outline: none; box-sizing: border-box;
            }
            .input3d-chat:focus { border-color: #f97316; box-shadow: 0 0 8px rgba(249,115,22,0.25); }
            .btn3d-voltar {
                background: none; border: none; color: #94a3b8; font-size: 12px; cursor: pointer;
                text-decoration: underline; margin-top: 10px; display: inline-flex; align-items: center; gap: 4px; padding: 3px 0;
            }
            .btn3d-voltar:hover { color: #fb923c; }
            #area3d-rodape { display: none; border-top: 1px solid #1e293b; padding: 12px 18px; background: #080e1a; }
            .btn3d-enviar {
                background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff; font-weight: 800;
                font-size: 13.5px; border: none; border-radius: 12px; padding: 12px 18px; cursor: pointer;
                width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
                box-shadow: 0 8px 20px rgba(249,115,22,0.35); transition: all 0.2s;
            }
            .btn3d-enviar:hover { filter: brightness(1.08); transform: translateY(-1px); }
            #aviso3d-feedback {
                display: none; padding: 10px; background: #065f46; color: #d1fae5;
                border-radius: 10px; font-size: 12px; text-align: center; margin-top: 10px;
            }
        `;
        document.head.appendChild(style);

        const wrapper = document.createElement('div');
        wrapper.id = 'container-triagem-3digitos';
        wrapper.innerHTML = `
            <button id="btn-retornar-triagem-3d" type="button" title="Sair do chat e voltar para as 4 opções">
                <span>← Sair do Chat e Voltar às 4 Opções</span>
            </button>
            <div id="janela-modal-3digitos">
                <div class="modal3d-topo">
                    <div>
                        <h4>Atendimento Digital 3Dígitos</h4>
                        <span>• Consultoria IA, Sistemas & Automações • Online</span>
                    </div>
                    <button type="button" class="btn3d-fechar" id="btn3d-fechar-modal" title="Fechar">&times;</button>
                </div>
                <div class="modal3d-conteudo">
                    <p class="modal3d-boasvindas" id="texto3d-boas-vindas">
                        Olá! 👋 Bem-vindo à <strong>3Dígitos (Agente3d)</strong>.<br>
                        Como podemos impulsionar o seu negócio hoje?
                    </p>
                    <div class="modal3d-opcoes" id="area3d-lista-opcoes">
                        <button type="button" class="btn3d-opcao" data-code="1" data-label="Automações & Atendimento com IA (WhatsApp / Chat)">
                            <span>🤖 1. Automações & Atendimento com IA</span>
                            <span style="font-size:12px;color:#94a3b8;">➔</span>
                        </button>
                        <button type="button" class="btn3d-opcao" data-code="2" data-label="Criar Site, Portal ou Sistema Sob Medida">
                            <span>💻 2. Criar Site, Portal ou Sistema Sob Medida</span>
                            <span style="font-size:12px;color:#94a3b8;">➔</span>
                        </button>
                        <button type="button" class="btn3d-opcao" data-code="3" data-label="E-books, Mentoria & Consultoria Tecnológica">
                            <span>📚 3. E-books, Mentoria & Consultoria</span>
                            <span style="font-size:12px;color:#94a3b8;">➔</span>
                        </button>
                        <button type="button" class="btn3d-opcao btn3d-opcao-zap" data-code="4" data-label="Solicitar Orçamento / Falar com Especialista">
                            <span>💬 4. Solicitar Orçamento / Falar com Especialista</span>
                            <span style="font-size:12px;color:#a7f3d0;">➔</span>
                        </button>
                    </div>
                    <div id="btn3d-reabrir-chat" style="display:none; margin-top:10px;">
                        <button type="button" id="btn3d-continuar-conversa" style="width:100%; background:rgba(16,185,129,0.14); border:1px solid #10b981; color:#6ee7b7; padding:9px 12px; border-radius:10px; font-size:12px; font-weight:700; cursor:pointer;">
                            💬 Continuar conversa ativa com o Especialista
                        </button>
                    </div>
                    <div id="area3d-dados-lead">
                        <div class="contexto3d-passo2" id="msg3d-contexto-passo2">
                            Perfeito! Informe seu nome e WhatsApp para iniciar seu atendimento ao vivo:
                        </div>
                        <div class="grupo3d-inputs">
                            <div>
                                <label class="label3d-lead">Seu Nome ou Empresa:</label>
                                <input type="text" id="campo3d-nome" class="input3d-chat" placeholder="Digite seu nome completo...">
                            </div>
                            <div>
                                <label class="label3d-lead">Seu WhatsApp com DDD:</label>
                                <input type="tel" id="campo3d-zap" class="input3d-chat" placeholder="(74) 99999-9999">
                            </div>
                            <div id="bloco3d-duvida">
                                <label class="label3d-lead">Resumo do Projeto ou Dúvida (opcional):</label>
                                <input type="text" id="campo3d-msg" class="input3d-chat" placeholder="Conte brevemente o que você busca...">
                            </div>
                        </div>
                        <button type="button" class="btn3d-voltar" id="btn3d-voltar-passo1">
                            ← Voltar para as 4 Opções
                        </button>
                    </div>
                    <div id="aviso3d-feedback"></div>
                </div>
                <div id="area3d-rodape">
                    <button type="button" class="btn3d-enviar" id="btn3d-iniciar-chat">
                        <span>🚀 Iniciar Atendimento com Especialista</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(wrapper);

        // Eventos do Modal de Triagem
        document.getElementById('btn3d-fechar-modal').addEventListener('click', () => this.toggleTriageModal());
        document.getElementById('btn-retornar-triagem-3d').addEventListener('click', () => this.voltarParaMenuOpcoes());
        document.getElementById('btn3d-voltar-passo1').addEventListener('click', () => this.voltarParaPasso1());
        document.getElementById('btn3d-continuar-conversa').addEventListener('click', () => {
            const modal = document.getElementById('janela-modal-3digitos');
            if (modal) modal.style.display = 'none';
            this.abrirChatwootWidget();
        });

        wrapper.querySelectorAll('.btn3d-opcao').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selecionarOpcao(btn, btn.getAttribute('data-code'), btn.getAttribute('data-label'));
            });
        });

        const zapInput = document.getElementById('campo3d-zap');
        if (zapInput) {
            zapInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 11);
                if (v.length > 6) e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                else if (v.length > 2) e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                else if (v.length > 0) e.target.value = `(${v.slice(0, 2)}`;
                else e.target.value = v;
            });
        }

        ['campo3d-nome', 'campo3d-zap', 'campo3d-msg'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.enviarLeadPortal();
                    }
                });
            }
        });

        document.getElementById('btn3d-iniciar-chat').addEventListener('click', () => this.enviarLeadPortal());

        // Escuta postMessage do Chatwoot para capturar authToken/sourceId
        window.addEventListener('message', (e) => {
            if (!e || !e.data) return;
            try {
                let dataObj = null;
                if (typeof e.data === 'string' && e.data.startsWith('chatwoot-widget:')) {
                    dataObj = JSON.parse(e.data.replace('chatwoot-widget:', ''));
                } else if (typeof e.data === 'object') {
                    dataObj = e.data;
                }
                if (dataObj && dataObj.event === 'loaded' && dataObj.config && dataObj.config.authToken) {
                    this._chatwootSourceId = dataObj.config.authToken;
                }
            } catch (_) {}
        });

        // Integra também o formulário de contato da página inicial (#contactAnalysisForm) se existir
        const contactForm = document.getElementById('contactAnalysisForm');
        if (contactForm && !contactForm.getAttribute('data-3d-bound')) {
            contactForm.setAttribute('data-3d-bound', 'true');
            contactForm.addEventListener('submit', () => {
                try {
                    const nome = (document.getElementById('contactName')?.value || '').trim();
                    const fone = (document.getElementById('contactPhone')?.value || '').replace(/\D/g, '');
                    const servico = (document.getElementById('contactService')?.value || 'Contato Geral').trim();
                    const msg = (document.getElementById('contactMessage')?.value || '').trim();
                    if (nome && fone.length >= 10) {
                        const prot = this.obterOuGerarProtocolo();
                        fetch(this.getWebhookUrl(), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                nome,
                                telefone: fone,
                                whatsapp: fone.startsWith('55') ? '+' + fone : '+55' + fone,
                                opcao: 'contato',
                                assunto: servico,
                                duvida: msg,
                                mensagem: msg,
                                resumo: `[${servico}] ${msg}`,
                                etiqueta: 'lead_contato_portal',
                                origem: 'contato_site',
                                source_id: this.obterChatwootSourceId(),
                                protocolo: prot
                            })
                        }).catch(() => {});
                    }
                } catch (_) {}
            });
        }
    },

    selecionarOpcao(btnEl, codigo, texto) {
        this._opcaoCodigo = codigo;
        this._opcaoTexto = texto;

        document.querySelectorAll('.btn3d-opcao').forEach(b => b.classList.remove('ativo'));
        if (btnEl) btnEl.classList.add('ativo');

        const boasVindas = document.getElementById('texto3d-boas-vindas');
        const lista = document.getElementById('area3d-lista-opcoes');
        const reabrir = document.getElementById('btn3d-reabrir-chat');
        if (boasVindas) boasVindas.style.display = 'none';
        if (lista) lista.style.display = 'none';
        if (reabrir) reabrir.style.display = 'none';

        const contextos = {
            '1': 'Excelente! Informe seu nome e WhatsApp para conversar sobre Automações e Agentes de IA:',
            '2': 'Ótimo! Informe seu nome e WhatsApp para falarmos sobre a criação do seu Site, Portal ou Sistema:',
            '3': 'Perfeito! Informe seu nome e WhatsApp para orientações sobre nossos E-books, Mentoria e Consultoria:',
            '4': 'Informe seu nome e WhatsApp para iniciar o atendimento direto com nosso especialista:'
        };
        const placeholders = {
            '1': 'Qual canal ou processo você gostaria de automatizar?',
            '2': 'Qual tipo de site ou sistema você deseja criar?',
            '3': 'Sobre qual tema ou consultoria gostaria de conversar?',
            '4': 'Qual a sua dúvida ou necessidade?'
        };

        const ctxEl = document.getElementById('msg3d-contexto-passo2');
        if (ctxEl && contextos[codigo]) ctxEl.textContent = contextos[codigo];

        const blocoDuvida = document.getElementById('bloco3d-duvida');
        const campoMsg = document.getElementById('campo3d-msg');
        if (codigo === '4') {
            if (blocoDuvida) blocoDuvida.style.display = 'none';
        } else {
            if (blocoDuvida) blocoDuvida.style.display = 'block';
            if (campoMsg && placeholders[codigo]) campoMsg.placeholder = placeholders[codigo];
        }

        const areaLead = document.getElementById('area3d-dados-lead');
        const areaRodape = document.getElementById('area3d-rodape');
        if (areaLead) areaLead.style.display = 'block';
        if (areaRodape) areaRodape.style.display = 'block';

        setTimeout(() => {
            const nomeInput = document.getElementById('campo3d-nome');
            if (nomeInput) nomeInput.focus();
        }, 80);
    },

    voltarParaPasso1() {
        this._opcaoCodigo = null;
        this._opcaoTexto = '';
        document.querySelectorAll('.btn3d-opcao').forEach(b => b.classList.remove('ativo'));

        const boasVindas = document.getElementById('texto3d-boas-vindas');
        const lista = document.getElementById('area3d-lista-opcoes');
        const areaLead = document.getElementById('area3d-dados-lead');
        const areaRodape = document.getElementById('area3d-rodape');
        const reabrir = document.getElementById('btn3d-reabrir-chat');

        if (boasVindas) boasVindas.style.display = 'block';
        if (lista) lista.style.display = 'flex';
        if (areaLead) areaLead.style.display = 'none';
        if (areaRodape) areaRodape.style.display = 'none';
        if (reabrir && this._leadCadastrado) reabrir.style.display = 'block';
    },

    voltarParaMenuOpcoes() {
        this.fecharChatwootWidget();
        const modal = document.getElementById('janela-modal-3digitos');
        if (modal) modal.style.display = 'flex';
        this.voltarParaPasso1();
    },

    abrirMenuFlutuante(codigoOpcao) {
        this.buildTriageModal();
        if (this._chatwootAberto) {
            this.fecharChatwootWidget();
        }
        const modal = document.getElementById('janela-modal-3digitos');
        if (modal) {
            modal.style.display = 'flex';
            if (codigoOpcao) {
                const btn = modal.querySelector(`.btn3d-opcao[data-code="${codigoOpcao}"]`);
                const label = btn ? btn.getAttribute('data-label') : '';
                this.selecionarOpcao(btn, codigoOpcao, label);
            } else {
                this.voltarParaPasso1();
            }
            modal.style.animation = 'none';
            modal.offsetHeight; /* trigger reflow */
            modal.style.animation = 'modal3dFadeIn 0.25s ease-out';
            if (window.innerWidth < 640) {
                modal.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        } else {
            const launcher = document.getElementById('chatwootLauncher');
            if (launcher) launcher.click();
        }
    },

    toggleTriageModal() {
        this.buildTriageModal();
        if (this._chatwootAberto) {
            this.voltarParaMenuOpcoes();
            return;
        }
        const modal = document.getElementById('janela-modal-3digitos');
        if (!modal) return;
        const isHidden = (modal.style.display === 'none' || !modal.style.display);
        modal.style.display = isHidden ? 'flex' : 'none';

        const reabrir = document.getElementById('btn3d-reabrir-chat');
        if (reabrir) reabrir.style.display = this._leadCadastrado ? 'block' : 'none';
    },

    abrirChatwootWidget() {
        this._chatwootAberto = true;
        this._fechamentoSolicitado = false;

        const aplicar = () => {
            if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
                try { window.$chatwoot.toggle('open'); } catch (_) {}
            }
            const holder = document.querySelector('.woot-widget-holder');
            if (holder) {
                holder.classList.remove('chat-oculto', 'woot--hide', 'woot--close');
                holder.classList.add('chat-ativo-visivel');
                holder.style.setProperty('display', 'block', 'important');
                holder.style.setProperty('visibility', 'visible', 'important');
                holder.style.setProperty('opacity', '1', 'important');
            }
            const btnRetorno = document.getElementById('btn-retornar-triagem-3d');
            if (btnRetorno) btnRetorno.style.display = 'flex';
        };
        aplicar();
        setTimeout(aplicar, 350);
    },

    fecharChatwootWidget() {
        this._fechamentoSolicitado = true;
        this._chatwootAberto = false;
        if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
            try { window.$chatwoot.toggle('close'); } catch (_) {}
        }
        const holder = document.querySelector('.woot-widget-holder');
        if (holder) {
            holder.classList.remove('chat-ativo-visivel');
            holder.classList.add('chat-oculto', 'woot--hide');
            holder.style.setProperty('display', 'none', 'important');
        }
        const btnRetorno = document.getElementById('btn-retornar-triagem-3d');
        if (btnRetorno) btnRetorno.style.display = 'none';
    },

    async enviarLeadPortal() {
        const nomeInput = document.getElementById('campo3d-nome');
        const zapInput = document.getElementById('campo3d-zap');
        const msgInput = document.getElementById('campo3d-msg');
        const feedback = document.getElementById('aviso3d-feedback');

        const nome = (nomeInput?.value || '').trim();
        const zap = (zapInput?.value || '').trim();
        const msg = (msgInput?.value || '').trim();

        if (!nome) {
            alert('Por favor, informe seu Nome ou Empresa para iniciarmos o atendimento.');
            if (nomeInput) nomeInput.focus();
            return;
        }

        const cleanDigits = zap.replace(/\D/g, '');
        if (!cleanDigits || cleanDigits.length < 10) {
            alert('Por favor, informe um WhatsApp válido com DDD (ex: 74 99122-3727).');
            if (zapInput) zapInput.focus();
            return;
        }

        const fullPhone = cleanDigits.startsWith('55') ? ('+' + cleanDigits) : ('+55' + cleanDigits);
        const mensagemFinal = msg || ('Solicitou atendimento inicial: ' + (this._opcaoTexto || 'Orçamento 3Dígitos'));
        const tag = (this._opcaoCodigo === '1') ? 'automacao_ia' :
                    (this._opcaoCodigo === '2') ? 'desenvolvimento_sistemas' :
                    (this._opcaoCodigo === '3') ? 'consultoria_ebooks' :
                    (this._opcaoCodigo === '4') ? 'lead_portal_zap' : 'lead_portal_3digitos';
        const protocoloAtual = this.obterOuGerarProtocolo();

        if (feedback) {
            feedback.style.display = 'block';
            feedback.innerHTML = 'Conectando ao especialista 3Dígitos em tempo real...';
        }

        // 1. Vincula o usuário no SDK do Chatwoot
        if (window.$chatwoot && typeof window.$chatwoot.setUser === 'function') {
            try {
                window.$chatwoot.setUser('lead_' + cleanDigits, {
                    name: nome,
                    email: cleanDigits + '@cliente.agente3d.net',
                    phone_number: fullPhone,
                    custom_attributes: {
                        numero_protocolo: protocoloAtual,
                        assunto: this._opcaoTexto || 'Consultoria 3Dígitos',
                        mensagem_inicial: mensagemFinal,
                        origem: 'Portal 3Dígitos',
                        etiqueta: tag
                    }
                });
                if (typeof window.$chatwoot.setCustomAttributes === 'function') {
                    window.$chatwoot.setCustomAttributes({
                        numero_protocolo: protocoloAtual,
                        assunto: this._opcaoTexto || 'Consultoria 3Dígitos',
                        telefone_whatsapp: fullPhone,
                        duvida_inicial: mensagemFinal,
                        etiqueta: tag
                    });
                }
            } catch (_) {}
        }

        // 2. Dispara o Webhook da Automação para criar a conversa, aplicar etiquetas e registrar o protocolo na Inbox 25
        const sourceIdAtual = this.obterChatwootSourceId();
        fetch(this.getWebhookUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome,
                telefone: cleanDigits,
                whatsapp: fullPhone,
                opcao: this._opcaoCodigo || '4',
                assunto: this._opcaoTexto || 'Atendimento Portal 3Dígitos',
                duvida: mensagemFinal,
                mensagem: mensagemFinal,
                resumo: mensagemFinal,
                etiqueta: tag,
                origem: 'widget_site',
                source_id: sourceIdAtual,
                protocolo: protocoloAtual
            })
        }).catch(() => {});

        this._leadCadastrado = true;
        if (feedback) {
            feedback.style.display = 'block';
            feedback.innerHTML = `✅ <strong>Atendimento Registrado!</strong><br><div style="margin-top:4px;font-size:13.5px;color:#fb923c;font-weight:800;">Protocolo Oficial: ${protocoloAtual}</div><small style="color:#a7f3d0;">Abrindo chat ao vivo com o especialista...</small>`;
        }

        setTimeout(() => {
            if (feedback) feedback.style.display = 'none';
            const modal = document.getElementById('janela-modal-3digitos');
            if (modal) modal.style.display = 'none';
            this.abrirChatwootWidget();
        }, 650);
    },

    openChat(fallbackUrl) {
        this.abrirMenuFlutuante('4');
    },

    setupChatwoot(settings, waLink) {
        this._fallbackWaLink = waLink;
        const base = (settings.chatwootBaseUrl || '').trim().replace(/\/+$/, '');
        const token = (settings.chatwootToken || '').trim();

        // Constrói o modal de triagem de 4 opções da 3Dígitos
        this.buildTriageModal();

        // Injeta o botão flutuante do mascote 3D nas páginas públicas caso ainda não exista
        const path = (window.location.pathname || '').toLowerCase();
        const isRestrictedPage = path.includes('admin') || path.includes('login') || path.includes('drive');
        if (!document.getElementById('chatwootLauncher') && !isRestrictedPage && document.body) {
            const launcherEl = document.createElement('a');
            launcherEl.id = 'chatwootLauncher';
            launcherEl.setAttribute('data-chatwoot', 'launcher');
            launcherEl.href = '#chat';
            launcherEl.title = 'Fale conosco';
            launcherEl.className = 'fixed bottom-6 right-6 z-50 flex items-center justify-center group transition-all duration-300 hover:scale-110';
            launcherEl.innerHTML = `
                <img src="whatsapp-icon.png" alt="Atendimento 3Dígitos" class="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-2xl animate-bounce group-hover:animate-none">
                <span class="absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-2xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100 after:content-[''] after:absolute after:top-1/2 after:right-[-6px] after:-translate-y-1/2 after:border-t-8 after:border-t-transparent after:border-l-8 after:border-l-white after:border-b-8 after:border-b-transparent">
                    Fale conosco!
                </span>
            `;
            document.body.appendChild(launcherEl);
        }

        if (!base || !token) {
            document.querySelectorAll('a[href*="wa.me"], [data-chatwoot]').forEach(link => {
                link.href = waLink;
                link.target = '_blank';
            });
            return;
        }

        // Vincula todos os botões de WhatsApp / Orçamento / Atendimento da página ao Modal de Triagem + Chatwoot
        const bindTrigger = (el) => {
            if (!el) return;
            el.setAttribute('data-chatwoot-trigger', 'true');
            el.removeAttribute('target');
            el.removeAttribute('rel');
            el.href = '#atendimento';
            el.onclick = (e) => {
                e.preventDefault();
                this.openChat(waLink);
            };
        };

        document.querySelectorAll('a[href*="wa.me"], [data-chatwoot], [data-chatwoot-trigger]').forEach(bindTrigger);

        // Delegação global de cliques para capturar também botões criados dinamicamente (ex: modais de e-books)
        if (!this._delegatedBound) {
            this._delegatedBound = true;
            document.addEventListener('click', (e) => {
                const trigger = e.target.closest('a[href*="wa.me/55"], [data-chatwoot], [data-chatwoot-trigger]');
                if (trigger) {
                    e.preventDefault();
                    this.openChat(this._fallbackWaLink);
                }
            });
        }

        // Carrega o SDK do Chatwoot uma única vez
        if (this._chatwootLoaded) return;
        this._chatwootLoaded = true;
        window.chatwootSettings = { hideMessageBubble: true, position: 'right', locale: 'pt_BR', type: 'standard' };

        window.addEventListener('chatwoot:ready', () => {
            this.obterChatwootSourceId();
            if (this._pendingOpen && window.$chatwoot) {
                this._pendingOpen = false;
                this.abrirChatwootWidget();
            }
        });

        const s = document.createElement('script');
        s.src = base + '/packs/js/sdk.js';
        s.async = true;
        s.onload = () => {
            if (window.chatwootSDK) {
                window.chatwootSDK.run({ websiteToken: token, baseUrl: base });
            }
        };
        s.onerror = () => {
            this._chatwootFailed = true;
            if (this._pendingOpen) {
                this._pendingOpen = false;
                window.open(this._fallbackWaLink, '_blank');
            }
        };
        document.body.appendChild(s);
    },

    // Aplicar configurações dinamicamente na página atual (ex: index.html)
    applyToPage(settings) {
        if (!settings) settings = this.getSettingsLocal();

        // 1. Atendimento Omnichannel (Chatwoot centralizado em todos os botões de Orçamento / WhatsApp)
        const cleanWhatsapp = (settings.whatsapp || '').replace(/\D/g, '');
        const waText = encodeURIComponent(settings.whatsappMessage || 'Olá!');
        const waLink = `https://wa.me/${cleanWhatsapp}?text=${waText}`;

        // 2. Telefones, E-mails e Endereço
        document.querySelectorAll('[data-sync="phone"]').forEach(el => el.textContent = settings.phone || '');
        document.querySelectorAll('[data-sync="email"]').forEach(el => {
            el.textContent = settings.email || '';
            if (el.tagName === 'A') el.href = `mailto:${settings.email}`;
        });
        document.querySelectorAll('[data-sync="address"]').forEach(el => el.textContent = settings.address || '');

        // 3. Banner Principal (Hero)
        const heroTagEl = document.getElementById('heroTag');
        if (heroTagEl && settings.heroTag) heroTagEl.textContent = settings.heroTag;

        const heroTitleEl = document.getElementById('heroTitle');
        if (heroTitleEl && settings.heroTitle) heroTitleEl.innerHTML = settings.heroTitle;

        const heroDescEl = document.getElementById('heroDesc');
        if (heroDescEl && settings.heroDesc) heroDescEl.textContent = settings.heroDesc;

        const heroCtaBtn = document.getElementById('heroCtaBtn');
        if (heroCtaBtn) {
            if (settings.heroCtaText) {
                const span = heroCtaBtn.querySelector('span');
                if (span) span.textContent = settings.heroCtaText;
                else heroCtaBtn.textContent = settings.heroCtaText;
            }
            if (settings.heroCtaType === 'whatsapp') {
                heroCtaBtn.setAttribute('data-chatwoot', 'cta');
            } else {
                heroCtaBtn.removeAttribute('data-chatwoot');
                heroCtaBtn.removeAttribute('data-chatwoot-trigger');
                heroCtaBtn.onclick = null;
                heroCtaBtn.href = '#contato';
                heroCtaBtn.removeAttribute('target');
            }
        }

        // Inicializa o Chatwoot e vincula todos os botões (incluindo heroCtaBtn, vitrines e flutuante)
        this.setupChatwoot(settings, waLink);

        // 4. Barra de Alerta Superior
        const bannerContainer = document.getElementById('topAnnouncementBanner');
        if (bannerContainer) {
            if (settings.announcementEnabled) {
                bannerContainer.classList.remove('hidden');
                const textEl = document.getElementById('topAnnouncementText');
                if (textEl) textEl.textContent = settings.announcementText || '';
                const linkEl = document.getElementById('topAnnouncementLink');
                if (linkEl && settings.announcementLink) linkEl.href = settings.announcementLink;
            } else {
                bannerContainer.classList.add('hidden');
            }
        }

        // 5. Links de Projetos (RHINOVA & Clínica)
        const rawRhinova = settings.rhinovaUrl || 'rhinova.html';
        const targetRhinovaUrl = (rawRhinova === 'http://localhost:8081') ? 'rhinova.html' : rawRhinova;

        document.querySelectorAll('a[data-project="rhinova"]').forEach(a => {
            a.href = targetRhinovaUrl;
            if (targetRhinovaUrl.startsWith('http')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else {
                a.removeAttribute('target');
                a.removeAttribute('rel');
            }
        });

        const targetClinicaUrl = settings.clinicaUrl || 'clinica.html';
        document.querySelectorAll('a[data-project="clinica"]').forEach(a => {
            a.href = targetClinicaUrl;
            if (targetClinicaUrl.startsWith('http')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else {
                a.removeAttribute('target');
                a.removeAttribute('rel');
            }
        });

        const targetLukeUrl = settings.lukeUrl || 'luke.html';
        document.querySelectorAll('a[data-project="luke"]').forEach(a => {
            a.href = targetLukeUrl;
            if (targetLukeUrl.startsWith('http')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else {
                a.removeAttribute('target');
                a.removeAttribute('rel');
            }
        });

        const targetAdvogadosUrl = settings.advogadosUrl || 'advogados.html';
        document.querySelectorAll('a[data-project="advogados"]').forEach(a => {
            a.href = targetAdvogadosUrl;
            if (targetAdvogadosUrl.startsWith('http')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else {
                a.removeAttribute('target');
                a.removeAttribute('rel');
            }
        });

        // 6. Redes Sociais
        document.querySelectorAll('a[data-social="instagram"]').forEach(a => a.href = settings.instagramUrl || '#');
        document.querySelectorAll('a[data-social="linkedin"]').forEach(a => a.href = settings.linkedinUrl || '#');
        document.querySelectorAll('a[data-social="youtube"]').forEach(a => a.href = settings.youtubeUrl || '#');
    }
};

// Auto-inicializar no index.html se estiver presente
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        // Aplica o cache instantaneamente para não ter flash de conteúdo
        const initial = SiteSync.getSettingsLocal();
        SiteSync.applyToPage(initial);

        // Tenta buscar atualizações mais recentes do servidor em segundo plano
        const updated = await SiteSync.fetchSettings();
        SiteSync.applyToPage(updated);
    });
}


// Disponibiliza SiteSync globalmente na janela
if (typeof window !== "undefined") {
    window.SiteSync = SiteSync;
}
