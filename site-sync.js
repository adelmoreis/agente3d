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
    lukeUrl: 'luke.html'
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

    // Integração Chatwoot Centralizada: todos os botões de atendimento/orçamento abrem o widget do Chatwoot
    _chatwootLoaded: false,
    _chatwootFailed: false,
    _pendingOpen: false,
    _delegatedBound: false,
    _fallbackWaLink: 'https://wa.me/5574991223727',

    openChat(fallbackUrl) {
        const wa = fallbackUrl || this._fallbackWaLink;
        if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
            window.$chatwoot.toggle('open');
            return;
        }
        if (this._chatwootLoaded && !this._chatwootFailed) {
            this._pendingOpen = true;
            return;
        }
        window.open(wa, '_blank');
    },

    setupChatwoot(settings, waLink) {
        this._fallbackWaLink = waLink;
        const base = (settings.chatwootBaseUrl || '').trim().replace(/\/+$/, '');
        const token = (settings.chatwootToken || '').trim();

        // Garante que o widget do Chatwoot fique sempre visível acima de modais e barras fixas
        if (!document.getElementById('chatwootZIndexFix')) {
            const style = document.createElement('style');
            style.id = 'chatwootZIndexFix';
            style.textContent = '.woot-widget-holder, .woot-widget-bubble, .woot--bubble-holder { z-index: 999999 !important; }';
            document.head.appendChild(style);
        }

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

        // Vincula todos os botões de WhatsApp / Orçamento / Atendimento da página ao Chatwoot
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
            if (this._pendingOpen && window.$chatwoot) {
                this._pendingOpen = false;
                window.$chatwoot.toggle('open');
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
