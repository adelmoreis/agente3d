// =========================================================================
// ESQUELETO MODULAR E DINÂMICO DO E-BOOK: DOMINE O CHATWOOT & AUTOMAÇÕES COM IA
// Este arquivo armazena a estrutura base de todos os tópicos, textos, imagens,
// vídeos explicativos e dicas interativas do livro vivo.
// =========================================================================

const INITIAL_LIVING_EBOOK = [
    {
        id: "pag-1",
        pageNumber: 1,
        module: "Apresentação Oficial",
        badge: "Capa & Abertura",
        title: "Domine o Chatwoot & Automações com IA",
        subtitle: "Como Centralizar Canais, Reduzir Custos Operacionais e Criar uma Máquina de Atendimento Inteligente 24 Horas por Dia com Código Aberto.",
        content: `
            <p class="text-lg text-slate-300 leading-relaxed mb-6">
                Bem-vindo ao manual técnico e prático de implementação da mais avançada infraestrutura de atendimento omnichannel e inteligência conversacional do mercado.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-blue-400 font-bold text-xs uppercase">Objetivo 01</span>
                    <h4 class="text-white font-bold mt-1 text-sm">Centralização Total</h4>
                    <p class="text-slate-400 text-xs mt-1">Unifique WhatsApp, Instagram Direct, Webchat e E-mail em um só lugar.</p>
                </div>
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-emerald-400 font-bold text-xs uppercase">Objetivo 02</span>
                    <h4 class="text-white font-bold mt-1 text-sm">Automação com IA</h4>
                    <p class="text-slate-400 text-xs mt-1">Conecte agentes autônomos para responder clientes 24/7 com transbordo humano.</p>
                </div>
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-orange-400 font-bold text-xs uppercase">Objetivo 03</span>
                    <h4 class="text-white font-bold mt-1 text-sm">Redução de Custos</h4>
                    <p class="text-slate-400 text-xs mt-1">Zero licença abusiva por atendente: sua VPS, seus dados, sua liberdade.</p>
                </div>
            </div>
            <p class="text-slate-400 text-sm">
                <strong>Autoria:</strong> Adelmo Reis • Fundador da 3Dígitos Tecnologia.<br>
                <strong>Ano da Edição:</strong> 2026 • 20 Páginas Técnicas e Comerciais.
            </p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
        videoUrl: "https://www.youtube.com/watch?v=Y7-TU9vooLI",
        videoTitle: "Vídeo Introdutório: Conheça a Visão Geral da Infraestrutura",
        tip: {
            title: "💡 Dica de Leitura Interativa",
            text: "Você pode marcar cada tópico como 'Concluído' no botão abaixo para acompanhar seu progresso e assistir aos vídeos de cada capítulo sem sair do livro!"
        }
    },
    {
        id: "pag-2",
        pageNumber: 2,
        module: "Módulo 1: Visão Geral e Infraestrutura",
        badge: "Sumário Executivo",
        title: "Sumário Executivo & Boas-Vindas",
        subtitle: "O mapa completo de habilidades e competências que você desenvolverá ao longo deste material.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Este manual técnico foi desenhado para eliminar de uma vez por todas o caos operacional em empresas e agências de tecnologia. Ao final desta leitura, você saberá com segurança:
            </p>
            <ul class="list-disc pl-5 space-y-2 text-slate-300 text-sm mb-6">
                <li>Instalar e configurar o Chatwoot em servidor VPS com alta disponibilidade e SSL automático.</li>
                <li>Operar em modo SaaS Multi-Tenant para vender acessos mensais a dezenas de empresas clientes.</li>
                <li>Estruturar o CRM com atributos personalizados para qualificação imediata de leads.</li>
                <li>Conectar o Chatwoot ao motor de automações através de Webhooks resilientes.</li>
                <li>Criar mecanismos anti-loop e transbordo inteligente de IA para atendentes humanos.</li>
                <li>Cobrar até R$ 5.000,00 por implantação e gerar renda recorrente mensal sustentável.</li>
            </ul>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "🚀 Como Tirar o Melhor Proveito",
            text: "Recomendamos que você abra um servidor de testes ou máquina virtual para praticar os comandos de cada módulo conforme avança."
        }
    },
    {
        id: "pag-3",
        pageNumber: 3,
        module: "Módulo 1: Visão Geral e Infraestrutura",
        badge: "Fundamentos",
        title: "O que é o Chatwoot e por que ele é indispensável?",
        subtitle: "A alternativa open-source definitiva ao Zendesk e Intercom com soberania de dados e LGPD.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                O <strong>Chatwoot</strong> é uma plataforma de atendimento ao cliente open source desenvolvida com tecnologias de nível corporativo (Ruby on Rails, Vue.js, PostgreSQL e Redis). Criado para democratizar o suporte multicanal, ele devolve a soberania de dados para sua empresa.
            </p>
            <h4 class="text-white font-bold text-base mb-2">Por que as empresas estão migrando?</h4>
            <div class="space-y-3 mb-6">
                <div class="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-sm">
                    <strong class="text-blue-400">1. Soberania e LGPD:</strong> Nenhum dado de conversa ou arquivo de cliente fica armazenado em servidores de terceiros com termos obscuros. O banco de dados pertence 100% à sua operação.
                </div>
                <div class="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-sm">
                    <strong class="text-emerald-400">2. Economia Exponencial:</strong> Ferramentas proprietárias cobram entre 50 e 150 dólares por atendente por mês. No Chatwoot auto-hospedado, você pode ter 5, 20 ou 100 atendentes pelo mesmo custo fixo da VPS.
                </div>
                <div class="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-sm">
                    <strong class="text-orange-400">3. Omnichannel Unificado:</strong> WhatsApp, Instagram, Webchat, E-mail e Telegram convergem para a mesma tela, evitando telefones celulares pulando de mão em mão no escritório.
                </div>
            </div>
        `,
        imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80",
        videoUrl: "https://www.youtube.com/watch?v=Y7-TU9vooLI",
        videoTitle: "Vídeo Explicativo: Por que o Chatwoot é superior a ferramentas proprietárias",
        tip: {
            title: "💡 Dica Pro do Adelmo",
            text: "Se você presta serviços para terceiros, apresente a conformidade com a LGPD e a redução de custos por operador como o principal argumento comercial de fechamento."
        }
    },
    {
        id: "pag-4",
        pageNumber: 4,
        module: "Módulo 1: Visão Geral e Infraestrutura",
        badge: "Arquitetura",
        title: "Arquitetura de Solução em 3 Pilares Desacoplados",
        subtitle: "Como o Chatwoot, o Motor de Automações e a API de WhatsApp trabalham juntos em perfeita harmonia.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                O maior erro de iniciantes é tentar fazer o sistema de atendimento executar lógica pesada de IA, ou colocar o robô para ser o painel dos atendentes. A arquitetura profissional e estável se divide em 3 pilares isolados:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border-t-4 border-emerald-500">
                    <span class="text-xs font-bold uppercase text-emerald-400">Pilar 1: Mensageria</span>
                    <h5 class="text-white font-bold mt-1 text-sm">API de WhatsApp</h5>
                    <p class="text-slate-400 text-xs mt-2">Evolution API, Z-API ou Meta Cloud API. Responsável exclusivo por conectar ao WhatsApp e trafegar pacotes de texto e mídia em milissegundos.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border-t-4 border-blue-500">
                    <span class="text-xs font-bold uppercase text-blue-400">Pilar 2: Cérebro Lógico</span>
                    <h5 class="text-white font-bold mt-1 text-sm">Motor de Automações</h5>
                    <p class="text-slate-400 text-xs mt-2">O motor orquestrador. Recebe Webhooks, consulta bancos de dados SQL, invoca agentes de IA e decide o roteamento do chamado.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border-t-4 border-purple-500">
                    <span class="text-xs font-bold uppercase text-purple-400">Pilar 3: Painel Humano</span>
                    <h5 class="text-white font-bold mt-1 text-sm">Chatwoot</h5>
                    <p class="text-slate-400 text-xs mt-2">A central de comando dos operadores humanos. Histórico completo, métricas de SLA, mensagens internas e supervisão em tempo real.</p>
                </div>
            </div>
            <p class="text-slate-400 text-xs">
                Se o WhatsApp desconectar ou o motor de automação sofrer uma manutenção, os operadores continuam trabalhando normalmente no Chatwoot sem perder o histórico do cliente.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "⚠️ Erro Comum a Evitar",
            text: "Nunca misture a lógica da IA com o painel humano. Manter a arquitetura desacoplada garante que se você trocar de modelo de IA (OpenAI, Claude, DeepSeek), o painel de atendimento permanece 100% intacto."
        }
    },
    {
        id: "pag-5",
        pageNumber: 5,
        module: "Módulo 1: Visão Geral e Infraestrutura",
        badge: "Infraestrutura & Deploy",
        title: "Infraestrutura Recomendada e Deploy com 1 Clique",
        subtitle: "Especificações de servidor VPS e instalação automática com Docker e Easypanel.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Para rodar uma instalação profissional do Chatwoot com capacidade para suportar mais de 50.000 mensagens por dia, recomendamos a seguinte configuração de hardware:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-xs font-bold uppercase text-blue-400">Hardware Mínimo Recomendado</span>
                    <ul class="text-xs text-slate-300 mt-2 space-y-1">
                        <li>• <strong>4 vCPUs</strong> (AMD EPYC ou Intel Xeon)</li>
                        <li>• <strong>8 GB de Memória RAM</strong> (essencial para Redis & Sidekiq)</li>
                        <li>• <strong>80 GB SSD NVMe</strong> com alta velocidade de I/O</li>
                        <li>• Provedores: Hostinger VPS, Hetzner Cloud ou Contabo</li>
                    </ul>
                </div>
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-xs font-bold uppercase text-emerald-400">Stack de Contêineres</span>
                    <ul class="text-xs text-slate-300 mt-2 space-y-1">
                        <li>• <strong>Chatwoot Web & Worker</strong> (processamento em fila)</li>
                        <li>• <strong>PostgreSQL 14+</strong> (banco relacional)</li>
                        <li>• <strong>Redis 7+</strong> (cache em memória e pub/sub de WebSockets)</li>
                        <li>• <strong>Traefik / Nginx</strong> (SSL automático Let's Encrypt)</li>
                    </ul>
                </div>
            </div>
            <div class="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400">
                # Deploy com 1 clique no Easypanel:<br>
                1. Instale o painel no VPS: curl -sSL https://get.easypanel.io | sh<br>
                2. Acesse a porta :3000 no navegador e adicione o Template oficial do Chatwoot<br>
                3. Aponte o subdomínio (ex: atendimento.suaempresa.com) com SSL automático.
            </div>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "💡 Dica de Ouro de Performance",
            text: "Reserve pelo menos 2 GB de memória RAM exclusivamente para o Redis e Sidekiq. Isso previne que mensagens fiquem enfileiradas nos horários de maior pico de mensagens."
        }
    },
    {
        id: "pag-6",
        pageNumber: 6,
        module: "Módulo 2: Gestão Multi-Tenant e SaaS",
        badge: "Multi-Tenant & White Label",
        title: "O Console de Super Admin e o Modelo White Label",
        subtitle: "Como transformar uma única instalação em um software de atendimento para dezenas de clientes pagantes.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Quando você instala o Chatwoot no seu servidor, você ganha acesso ao <strong>Super Admin Console</strong> (acessível pelo endereço <code>/super_admin</code>). Essa camada permite que você opere como provedor de software (SaaS).
            </p>
            <h4 class="text-white font-bold text-base mb-2">Vantagens da Arquitetura Multi-Inquilino:</h4>
            <ul class="list-disc pl-5 space-y-2 text-slate-300 text-sm mb-6">
                <li><strong>Isolamento Rigoroso de Dados:</strong> Cada empresa cliente possui seu próprio identificador (Account ID). Uma empresa jamais vê as mensagens, contatos ou relatórios de outra.</li>
                <li><strong>Gestão Centralizada de Atualizações:</strong> Quando você atualiza o contêiner no servidor, todas as empresas clientes recebem as melhorias instantaneamente.</li>
                <li><strong>Customização Visual White Label:</strong> Ajuste logotipo, título de aba, cores de marca e termos de serviço para que o cliente veja a sua própria marca.</li>
            </ul>
        `,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "💰 Modelo de Negócios Escalável",
            text: "Ao provisionar uma conta no Super Admin, defina limites de agentes (ex: até 5 atendentes no Plano Básico, até 15 no Plano Pro). Isso incentiva upgrades graduais conforme a empresa do cliente cresce."
        }
    },
    {
        id: "pag-7",
        pageNumber: 7,
        module: "Módulo 2: Gestão Multi-Tenant e SaaS",
        badge: "Inboxes & WhatsApp",
        title: "Configurando Caixas de Entrada (Inboxes)",
        subtitle: "Conectando canais nativos e integrando WhatsApp via API sem risco de bloqueio.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                No Chatwoot, cada canal de atendimento é representado por uma <strong>Caixa de Entrada (Inbox)</strong>. É possível ter múltiplas caixas para diferentes propósitos (ex: WhatsApp Vendas, WhatsApp Suporte Técnico, Instagram Direct).
            </p>
            <div class="space-y-4 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <h5 class="text-white font-bold text-sm mb-1">Canais Nativos:</h5>
                    <p class="text-slate-400 text-xs">Web Widget (chat flutuante para websites com envio de anexos), E-mail com encaminhamento IMAP/SMTP, Telegram Bot e Facebook/Instagram Messenger.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <h5 class="text-emerald-400 font-bold text-sm mb-1">Caixas de Entrada do Tipo API (WhatsApp):</h5>
                    <p class="text-slate-400 text-xs">Ao selecionar o canal "API", o Chatwoot gera um <code>inbox_id</code> e uma chave de webhook. Basta conectar sua instância da API de WhatsApp nessa URL para sincronizar áudios, PDFs, figurinhas e mensagens em tempo real.</p>
                </div>
            </div>
        `,
        imageUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=Y7-TU9vooLI",
        videoTitle: "Vídeo Prático: Configuração Completa de Caixas de Entrada no Chatwoot",
        tip: {
            title: "💡 Dica de Atribuição Automática",
            text: "Ative a opção 'Atribuição Automática' (Round-Robin) na caixa de entrada para que novas conversas sejam distribuídas de forma justa e alternada entre os atendentes online no momento."
        }
    },
    {
        id: "pag-8",
        pageNumber: 8,
        module: "Módulo 2: Gestão Multi-Tenant e SaaS",
        badge: "Equipes & Segurança",
        title: "Gestão de Agentes, Equipes e Permissões",
        subtitle: "Como organizar atendentes em times especialistas com total controle de acesso.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                À medida que a operação cresce, a separação de responsabilidades torna-se vital. O Chatwoot oferece perfis de permissão bem definidos para proteger a integridade das conversas:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-blue-400 font-bold text-xs uppercase">Perfil Administrador</span>
                    <p class="text-slate-300 text-xs mt-1">Acesso irrestrito a configurações de caixas de entrada, relatórios de SLA, contratação de novos agentes e integrações de Webhook.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-emerald-400 font-bold text-xs uppercase">Perfil Agente / Operador</span>
                    <p class="text-slate-300 text-xs mt-1">Acesso focado apenas nas conversas atribuídas a ele ou ao seu time, sem permissão para exportar contatos ou alterar configurações críticas.</p>
                </div>
            </div>
            <h4 class="text-white font-bold text-sm mb-2">Equipes Especializadas (Teams):</h4>
            <p class="text-slate-400 text-xs mb-4">
                Crie times como <em>Vendas Brasil</em>, <em>Suporte Nível 2</em> ou <em>Financeiro</em>. As conversas podem ser transferidas entre equipes com um clique, notificando os membros instantaneamente no navegador e no aplicativo mobile.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "📱 Aplicativo Móvel Oficial",
            text: "O Chatwoot possui aplicativo para iOS e Android. Os atendentes podem receber notificações push e responder clientes pelo celular sem precisar expor seus números pessoais."
        }
    },
    {
        id: "pag-9",
        pageNumber: 9,
        module: "Módulo 2: Gestão Multi-Tenant e SaaS",
        badge: "Automações Nativas",
        title: "Automações Nativas do Chatwoot (Gatilhos e SLAs)",
        subtitle: "Regras de negócio automáticas para etiquetagem, roteamento e prazos de resposta.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Dentro do menu <strong>Configurações > Automações</strong>, você pode criar regras automatizadas baseadas em gatilhos de eventos sem escrever uma única linha de código:
            </p>
            <div class="space-y-3 mb-6">
                <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                    <strong class="text-blue-400">Triagem por Palavra-Chave:</strong> Se o cliente enviar uma mensagem contendo "comprar" ou "preço", adicione automaticamente a etiqueta <code>lead-quente</code> e transfira para o time de Vendas.
                </div>
                <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                    <strong class="text-orange-400">Alerta de SLA Excedido:</strong> Se uma conversa ficar mais de 15 minutos sem resposta de um operador, envie uma notificação prioritária para o supervisor de atendimento.
                </div>
                <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                    <strong class="text-emerald-400">Fechamento Automático por Inatividade:</strong> Se o cliente não responder por mais de 48 horas, marque o chamado como resolvido e envie uma mensagem de encerramento amigável.
                </div>
            </div>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "⚡ Dica de Eficiência",
            text: "Configure a automação de SLA para alertar atendentes antes que o cliente sinta demora. Reduzir o tempo de primeira resposta é o fator nº 1 para disparar as avaliações de satisfação (CSAT)."
        }
    },
    {
        id: "pag-10",
        pageNumber: 10,
        module: "Módulo 2: Gestão Multi-Tenant e SaaS",
        badge: "Base de Conhecimento",
        title: "Central de Ajuda e Artigos de Autoatendimento",
        subtitle: "Como reduzir até 40% dos chamados repetitivos com uma base de conhecimento pública.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                O módulo de <strong>Central de Ajuda (Help Center)</strong> do Chatwoot permite criar portais de autoatendimento públicos com artigos detalhados, tutoriais e FAQs categorizadas.
            </p>
            <h4 class="text-white font-bold text-sm mb-2">Por que ela é crucial para o seu ecossistema?</h4>
            <p class="text-slate-400 text-xs mb-4">
                Além de resolver dúvidas frequentes de clientes (como formas de pagamento, políticas de entrega e horários de suporte), a Central de Ajuda serve como a <strong>base vetorial de conhecimento</strong> que abastece os robôs de Inteligência Artificial para que eles respondam com 100% de fidelidade aos fatos da sua empresa.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "🧠 O Segredo da IA Confiável",
            text: "Quando você mantém seus artigos da Central de Ajuda atualizados, os agentes de IA leem essas informações via API e nunca inventam respostas (alucinação zero)."
        }
    },
    {
        id: "pag-11",
        pageNumber: 11,
        module: "Módulo 3: Recursos de CRM e Produtividade Humana",
        badge: "CRM & Atributos",
        title: "Transformando o Chatwoot em CRM (Atributos Personalizados)",
        subtitle: "Como armazenar dados estratégicos de contatos e oportunidades diretamente na barra lateral.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Muitas empresas compram softwares de CRM caríssimos apenas para guardar dados básicos de clientes. No Chatwoot, você pode configurar <strong>Atributos Personalizados (Custom Attributes)</strong> divididos em dois níveis:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-blue-400 font-bold text-xs uppercase">Atributos de Contato (Perenes)</span>
                    <ul class="text-xs text-slate-300 mt-2 space-y-1">
                        <li>• CPF ou CNPJ</li>
                        <li>• Cidade / Estado</li>
                        <li>• Canal de Origem (Tráfego Pago, Indicação)</li>
                        <li>• E-mail e Telefone Alternativo</li>
                    </ul>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-emerald-400 font-bold text-xs uppercase">Atributos de Conversa (Voláteis)</span>
                    <ul class="text-xs text-slate-300 mt-2 space-y-1">
                        <li>• Valor da Proposta / Orçamento</li>
                        <li>• Tipo de Serviço Desejado</li>
                        <li>• Data de Retorno Agendada</li>
                        <li>• Motivo da Perda da Negociação</li>
                    </ul>
                </div>
            </div>
            <p class="text-slate-400 text-xs">
                Esses dados são preenchidos tanto manualmente pelo atendente quanto automaticamente pelo motor de automações durante a triagem inicial com IA.
            </p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "💡 Dica de Integração com Banco SQL",
            text: "Quando o motor de automação consulta o ERP da empresa e encontra um pedido aberto, ele pode injetar o número do pedido diretamente nos atributos de conversa do Chatwoot antes do operador atender."
        }
    },
    {
        id: "pag-12",
        pageNumber: 12,
        module: "Módulo 3: Recursos de CRM e Produtividade Humana",
        badge: "Etiquetas & Filtros",
        title: "Etiquetas (Labels) como Gatilhos e Filtros Visuais",
        subtitle: "Classificação visual colorida para acelerar a localização de chamados prioritários.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                As <strong>Etiquetas (Labels)</strong> são pequenas marcações visuais com código de cores que ajudam a organizar visualmente a esteira de atendimento:
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div class="p-3 bg-red-950/60 border border-red-800/60 rounded-xl text-center">
                    <span class="inline-block w-3 h-3 rounded-full bg-red-500 mb-1"></span>
                    <p class="text-xs font-bold text-red-300">urgente</p>
                    <p class="text-[10px] text-slate-400">Cliente insatisfeito</p>
                </div>
                <div class="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-center">
                    <span class="inline-block w-3 h-3 rounded-full bg-emerald-500 mb-1"></span>
                    <p class="text-xs font-bold text-emerald-300">fechamento</p>
                    <p class="text-[10px] text-slate-400">Orçamento aprovado</p>
                </div>
                <div class="p-3 bg-blue-950/60 border border-blue-800/60 rounded-xl text-center">
                    <span class="inline-block w-3 h-3 rounded-full bg-blue-500 mb-1"></span>
                    <p class="text-xs font-bold text-blue-300">humano</p>
                    <p class="text-[10px] text-slate-400">Transbordo de IA</p>
                </div>
            </div>
            <p class="text-slate-400 text-xs">
                Na barra lateral esquerda, clicar em qualquer etiqueta filtra instantaneamente apenas as conversas correspondentes, permitindo que supervisores façam varreduras rápidas em segundos.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "⚡ Automação por Etiqueta",
            text: "Use a etiqueta 'humano' como gatilho do motor de automações para sinalizar que o operador assumiu o chamado e pausar imediatamente as respostas automáticas da inteligência artificial."
        }
    },
    {
        id: "pag-13",
        pageNumber: 13,
        module: "Módulo 3: Recursos de CRM e Produtividade Humana",
        badge: "Colaboração Interna",
        title: "Colaboração Interna: Mensagens Privadas e Menções (@)",
        subtitle: "Como resolver casos complexos em equipe sem expor conversas internas ao cliente.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                No Chatwoot, existe uma chave de alternância fundamental no campo de digitação: <strong>Mensagem Pública vs. Nota Privada (Private Note)</strong>.
            </p>
            <div class="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl mb-6">
                <span class="text-amber-400 font-bold text-xs uppercase">Como funcionam as Notas Privadas (Post-it Amarelo):</span>
                <p class="text-slate-300 text-xs mt-2">
                    Tudo o que for digitado em modo privado fica destacado com fundo amarelo e é visível <strong>apenas para a equipe interna</strong>. O cliente no WhatsApp ou Instagram jamais recebe essa mensagem.
                </p>
                <div class="mt-3 p-3 bg-amber-500/10 rounded-xl font-mono text-xs text-amber-300">
                    @adelmo verifiquei no sistema financeiro e o comprovante deste cliente foi compensado. Pode liberar o acesso ao sistema!
                </div>
            </div>
            <p class="text-slate-400 text-xs">
                Ao digitar <code>@nome_do_colega</code> em uma nota privada, o atendente mencionado recebe uma notificação instantânea e pode responder no mesmo histórico sem poluir a conversa do cliente.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "💡 Fim dos Grupos Paralelos de WhatsApp",
            text: "Elimine o hábito de criar grupos paralelos no WhatsApp para tirar dúvidas sobre clientes. Usar notas privadas no próprio Chatwoot mantém o histórico de contexto centralizado para sempre."
        }
    },
    {
        id: "pag-14",
        pageNumber: 14,
        module: "Módulo 3: Recursos de CRM e Produtividade Humana",
        badge: "Produtividade Máxima",
        title: "Macros e Respostas Rápidas (Atalhos com /)",
        subtitle: "Como multiplicar por 3 a velocidade de resposta de cada operador comercial.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Atendentes perdem horas preciosas digitando os mesmos textos repetidamente (chave Pix, dados bancários, horários de funcionamento, links de agendamento). O Chatwoot resolve isso com duas ferramentas:
            </p>
            <div class="space-y-4 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <h5 class="text-white font-bold text-sm mb-1">1. Respostas Rápidas com Barra (/):</h5>
                    <p class="text-slate-300 text-xs">Digitando uma barra (<code>/</code>) na caixa de texto, abre-se um menu rápido. Exemplos: <code>/pix</code> insere a chave Pix formatada; <code>/horario</code> envia o horário de atendimento comercial; <code>/site</code> envia o link institucional.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <h5 class="text-emerald-400 font-bold text-sm mb-1">2. Macros com Ações em Cadeia:</h5>
                    <p class="text-slate-300 text-xs">Com 1 clique em um botão de Macro, o Chatwoot executa 4 ações ao mesmo tempo: adiciona a etiqueta 'suporte-resolvido', insere uma nota privada 'Atendimento concluído via WhatsApp', envia a pesquisa de satisfação e encerra a conversa.</p>
                </div>
            </div>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "🚀 Meta de Operação",
            text: "Com respostas rápidas bem configuradas, cada atendente humano passa a gerenciar confortavelmente de 4 a 6 conversas simultâneas sem perder a atenção ou a qualidade do diálogo."
        }
    },
    {
        id: "pag-15",
        pageNumber: 15,
        module: "Módulo 4: Automação, IA e Transbordo Humano",
        badge: "Webhooks & Automações",
        title: "Conectando Webhooks com o Motor de Automações",
        subtitle: "O canal de comunicação bidirecional que transforma mensagens em ações inteligentes.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Para que robôs de Inteligência Artificial conversem com o Chatwoot, você precisa configurar os <strong>Webhooks</strong> em <strong>Configurações > Integrações > Webhooks</strong>.
            </p>
            <h4 class="text-white font-bold text-sm mb-2">Eventos Críticos a Serem Monitorados:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-mono">
                    <span class="text-emerald-400 font-bold">message_created</span><br>
                    <span class="text-slate-400">Disparado sempre que o cliente ou um operador envia uma nova mensagem.</span>
                </div>
                <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-mono">
                    <span class="text-blue-400 font-bold">conversation_updated</span><br>
                    <span class="text-slate-400">Disparado quando a conversa muda de status, ganha uma etiqueta ou é atribuída.</span>
                </div>
            </div>
            <p class="text-slate-400 text-xs">
                O motor de automação recebe o JSON da mensagem, analisa o remetente (<code>message_type: incoming</code>) e dispara a lógica de IA para formular a resposta ideal em menos de 2 segundos.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "⚠️ Filtro de Segurança Anti-Loop",
            text: "No motor de automação, sempre filtre para responder apenas quando message_type for 'incoming'. Se você responder a mensagens 'outgoing', o robô responderá a si mesmo e entrará em loop infinito."
        }
    },
    {
        id: "pag-16",
        pageNumber: 16,
        module: "Módulo 4: Automação, IA e Transbordo Humano",
        badge: "Transbordo Inteligente",
        title: "O Mecanismo de Transbordo Humano (Pausa Inteligente da IA)",
        subtitle: "Como silenciar a IA imediatamente assim que um humano assume a conversa.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                O maior pesadelo no atendimento automatizado é o <em>"agente de IA descontrolado"</em>: o atendente humano está tentando explicar algo para o cliente no WhatsApp e o robô continua disparando mensagens automáticas ao mesmo tempo.
            </p>
            <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700 mb-6">
                <h5 class="text-emerald-400 font-bold text-sm mb-2">A Arquitetura de Pausa Infalível (2 Verificações):</h5>
                <ol class="list-decimal pl-5 space-y-2 text-xs text-slate-300">
                    <li><strong>Verificação por Atribuição (Assignee ID):</strong> No motor de automações, o primeiro nó verifica: <code>conversation.assignee_id != null</code>? Se sim, encerre o fluxo da IA imediatamente porque um atendente já assumiu a conversa.</li>
                    <li><strong>Verificação por Etiqueta (Tag Check):</strong> Se a conversa possuir a etiqueta <code>humano</code> ou <code>pausar-ia</code>, o motor de automação ignora silenciosamente qualquer mensagem nova do cliente.</li>
                </ol>
            </div>
            <p class="text-slate-400 text-xs">
                Dessa forma, o transbordo é 100% fluido: o robô faz a triagem inicial e qualificação do lead; quando o cliente pede um humano, o robô adiciona a etiqueta e transfere a conversa em silêncio absoluto.
            </p>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "💡 Resumo para o Atendente Humano",
            text: "Antes de transferir para o operador, faça a IA publicar uma 'Nota Privada' interna com o resumo em tópicos do que o cliente precisa. O atendente entra na conversa já sabendo de tudo sem fazer perguntas repetitivas."
        }
    },
    {
        id: "pag-17",
        pageNumber: 17,
        module: "Módulo 4: Automação, IA e Transbordo Humano",
        badge: "Captain IA Nativa",
        title: "O Módulo Captain (IA Generativa Nativa do Chatwoot)",
        subtitle: "Como turbinar a produtividade dos operadores com copiloto de IA integrado ao painel.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Além de agentes externos conectados por Webhook, as versões mais recentes do Chatwoot trazem o módulo <strong>Captain</strong>: recursos de IA generativa embutidos diretamente na interface de atendimento.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-blue-400 font-bold text-xs">Expansão de Ideias</span>
                    <p class="text-slate-300 text-xs mt-1">O operador digita apenas "ok garantia 90 dias" e a IA redige uma mensagem cordial, polida e gramaticalmente perfeita.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-emerald-400 font-bold text-xs">Resumo Executivo</span>
                    <p class="text-slate-300 text-xs mt-1">Sintetiza um histórico longo de 50 mensagens em um resumo executivo de 3 linhas com os pontos de ação pendentes.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-purple-400 font-bold text-xs">Mudança de Tom</span>
                    <p class="text-slate-300 text-xs mt-1">Ajusta o tom da mensagem instantaneamente para formal, amigável ou conciso com um clique.</p>
                </div>
            </div>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "⚡ Ativação com Chave de API",
            text: "Para habilitar o módulo Captain, basta inserir sua chave de API (OpenAI ou compatível) no Super Admin. O recurso fica imediatamente disponível para todos os operadores da equipe."
        }
    },
    {
        id: "pag-18",
        pageNumber: 18,
        module: "Módulo 4: Automação, IA e Transbordo Humano",
        badge: "Auditoria & Compliance",
        title: "Auditoria de Conversas e Segurança de Dados",
        subtitle: "Como manter rastreabilidade total de ações para fins jurídicos e de qualidade.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Em operações corporativas, a segurança da informação é prioridade máxima. O Chatwoot mantém uma trilha de auditoria contínua e imutável de todas as ações executadas no sistema:
            </p>
            <ul class="list-disc pl-5 space-y-2 text-slate-300 text-xs mb-6">
                <li>Registro exato de qual operador visualizou, respondeu ou transferiu cada chamado, com data e milissegundo.</li>
                <li>Gravação de notas privadas com autoria identificada para prestação de contas interna.</li>
                <li>Histórico inalterável de mensagens trocadas via WhatsApp para salvaguarda jurídica da empresa em caso de disputa comercial.</li>
                <li>Backups automatizados do banco de dados PostgreSQL com retenção diária e criptografia de ponta a ponta.</li>
            </ul>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "🔒 Blindagem Jurídica",
            text: "Em caso de auditoria ou processo de consumidor, o histórico completo pode ser exportado em formato seguro com registros criptográficos válidos."
        }
    },
    {
        id: "pag-19",
        pageNumber: 19,
        module: "Módulo 5: Métricas e Modelo de Negócio",
        badge: "Métricas & SLAs",
        title: "Relatórios Operacionais e Indicadores de Desempenho",
        subtitle: "Como analisar FRT, tempo de resolução e o mapa de calor de tráfego para tomar decisões baseadas em dados.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                O painel de <strong>Relatórios</strong> do Chatwoot fornece métricas operacionais essenciais para a tomada de decisão da diretoria:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-xs font-bold uppercase text-blue-400">Tempo de 1ª Resposta (FRT)</span>
                    <h5 class="text-white font-extrabold text-xl mt-1">Média < 2 min</h5>
                    <p class="text-slate-400 text-xs mt-1">Tempo entre a chegada da mensagem e a primeira resposta enviada pelo robô ou atendente.</p>
                </div>
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-xs font-bold uppercase text-emerald-400">Tempo de Resolução</span>
                    <h5 class="text-white font-extrabold text-xl mt-1">Média < 15 min</h5>
                    <p class="text-slate-400 text-xs mt-1">Tempo total decorrido desde a abertura até a marcação da conversa como resolvida.</p>
                </div>
                <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span class="text-xs font-bold uppercase text-orange-400">Mapa de Calor (Heatmap)</span>
                    <h5 class="text-white font-extrabold text-xl mt-1">Picos 10h & 15h</h5>
                    <p class="text-slate-400 text-xs mt-1">Mostra visualmente os dias da semana e horários com maior volume de chamados recebidos.</p>
                </div>
            </div>
            <p class="text-slate-400 text-xs">
                Essas métricas permitem dimensionar a escala da equipe de suporte e provar o retorno sobre o investimento (ROI) da automação para o cliente.
            </p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
        videoUrl: "",
        videoTitle: "",
        tip: {
            title: "📊 Exportação para Power BI / Metabase",
            text: "Como o banco do Chatwoot é PostgreSQL aberto, você pode conectar ferramentas como Metabase ou Power BI diretamente no banco (em réplica de leitura) para criar dashboards executivos em telões no escritório."
        }
    },
    {
        id: "pag-20",
        pageNumber: 20,
        module: "Módulo 5: Métricas e Modelo de Negócio",
        badge: "Modelo Comercial & Lucro",
        title: "Plano de Ação: Como Vender Soluções de Atendimento com IA",
        subtitle: "Formatos de precificação, nichos de alta conversão e simulador interativo de faturamento.",
        content: `
            <p class="text-slate-300 leading-relaxed mb-4">
                Agora que você domina toda a infraestrutura técnica, o passo final é transformá-la em um negócio lucrativo e recorrente. O modelo de vendas ideal combina duas fontes de receita:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-orange-400 font-bold text-xs uppercase">1. Taxa de Implantação (Setup Único)</span>
                    <p class="text-white font-extrabold text-lg mt-1">R$ 1.500 a R$ 5.000</p>
                    <p class="text-slate-400 text-xs mt-1">Criação do servidor VPS, configuração dos canais de WhatsApp, treinamento da IA com a base da empresa e workshop de 1 hora com os operadores.</p>
                </div>
                <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <span class="text-emerald-400 font-bold text-xs uppercase">2. Mensalidade Recorrente (MRR SaaS)</span>
                    <p class="text-white font-extrabold text-lg mt-1">R$ 180 a R$ 600 / mês</p>
                    <p class="text-slate-400 text-xs mt-1">Hospedagem segura da conta no seu Super Admin, monitoramento de saúde do servidor, backups diários e suporte técnico prioritário.</p>
                </div>
            </div>
            <h4 class="text-white font-bold text-sm mb-2">Nichos com Maior Taxa de Fechamento:</h4>
            <ul class="list-disc pl-5 space-y-1 text-slate-300 text-xs mb-4">
                <li><strong>Clínicas Médicas e Odontológicas:</strong> Alto volume de confirmação de consultas e agendamentos.</li>
                <li><strong>Imobiliárias e Corretores:</strong> Qualificação imediata de compradores e envio de catálogo de imóveis.</li>
                <li><strong>E-commerce e Varejo:</strong> Rastreio automático de encomendas e recuperação de carrinhos abandonados.</li>
                <li><strong>Escritórios de Advocacia e Contabilidade:</strong> Triagem de novos clientes com total sigilo de dados.</li>
            </ul>
        `,
        imageUrl: "",
        videoUrl: "",
        videoTitle: "",
        widget: "roi-calculator",
        tip: {
            title: "🎯 Meta Inicial Recomendada",
            text: "Feche seus primeiros 10 clientes de suporte e hospedagem a R$ 350/mês. Isso gera R$ 3.500,00 de faturamento recorrente garantido todo mês em uma única VPS que custa menos de R$ 90!"
        }
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { INITIAL_LIVING_EBOOK };
}
