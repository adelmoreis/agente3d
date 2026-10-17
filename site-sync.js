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
                // Se ainda estiver com o localhost:8081 antigo, migra para a vitrine rhinova.html
                if (parsed.rhinovaUrl === 'http://localhost:8081' || !parsed.rhinovaUrl) {
                    parsed.rhinovaUrl = 'rhinova.html';
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
        return settings;
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

    // Integração Chatwoot: o ícone flutuante abre o chat; sem configuração, usa o WhatsApp
    _chatwootLoaded: false,
    setupChatwoot(settings, waLink) {
        const launcher = document.getElementById('chatwootLauncher');
        const base = (settings.chatwootBaseUrl || '').trim().replace(/\/+$/, '');
        const token = (settings.chatwootToken || '').trim();

        if (!launcher) return;
        if (!base || !token) {
            launcher.href = waLink;   // fallback
            return;
        }

        launcher.removeAttribute('target');
        launcher.href = '#';
        launcher.onclick = (e) => {
            e.preventDefault();
            if (window.$chatwoot) window.$chatwoot.toggle('open');
            else window.open(waLink, '_blank');
        };

        if (this._chatwootLoaded) return;
        this._chatwootLoaded = true;
        window.chatwootSettings = { hideMessageBubble: true, position: 'right', locale: 'pt_BR', type: 'standard' };
        const s = document.createElement('script');
        s.src = base + '/packs/js/sdk.js';
        s.async = true;
        s.onload = () => window.chatwootSDK && window.chatwootSDK.run({ websiteToken: token, baseUrl: base });
        document.body.appendChild(s);
    },

    // Aplicar configurações dinamicamente na página atual (ex: index.html)
    applyToPage(settings) {
        if (!settings) settings = this.getSettingsLocal();

        // 1. WhatsApp em toda a página
        const cleanWhatsapp = (settings.whatsapp || '').replace(/\D/g, '');
        const waText = encodeURIComponent(settings.whatsappMessage || 'Olá!');
        const waLink = `https://wa.me/${cleanWhatsapp}?text=${waText}`;

        document.querySelectorAll('a[href*="wa.me"]:not([data-chatwoot])').forEach(link => {
            link.href = waLink;
        });

        // Ícone flutuante = Chatwoot (canal omnichannel). Demais botões continuam no WhatsApp.
        this.setupChatwoot(settings, waLink);

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
                heroCtaBtn.href = waLink;
                heroCtaBtn.target = '_blank';
            } else {
                heroCtaBtn.href = '#contato';
                heroCtaBtn.removeAttribute('target');
            }
        }

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
