/**
 * 3Dígitos - Servidor Node.js Opcional para VPS Hostinger
 * Caso prefira rodar com Node.js (via PM2) em vez de PHP/Nginx puro.
 *
 * Como rodar na VPS:
 *   npm install express cors
 *   node server.js
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 13080;
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: '15mb' }));


function readJson(filename, defaultValue = null) {
    const fullPath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(fullPath)) return defaultValue;
    try {
        return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch {
        return defaultValue;
    }
}

function writeJson(filename, data) {
    const fullPath = path.join(DATA_DIR, filename);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
}

// 1. Configurações do Site
app.get('/api/settings', (req, res) => {
    res.json({ success: true, data: readJson('site_settings.json', null) });
});

app.post('/api/settings', (req, res) => {
    writeJson('site_settings.json', req.body);
    res.json({ success: true, message: 'Configurações salvas com sucesso!' });
});

// 2. Blog & Notícias
app.get('/api/blog', (req, res) => {
    res.json({ success: true, data: readJson('blog_posts.json', []) });
});

app.post('/api/blog', (req, res) => {
    writeJson('blog_posts.json', req.body);
    res.json({ success: true, message: 'Blog atualizado com sucesso!' });
});

// 3. Projetos da Vitrine
app.get('/api/projects', (req, res) => {
    res.json({ success: true, data: readJson('projects.json', []) });
});

app.post('/api/projects', (req, res) => {
    writeJson('projects.json', req.body);
    res.json({ success: true, message: 'Projetos atualizados com sucesso!' });
});

// Rota de compatibilidade com api.php
app.all('/api.php', (req, res) => {
    const action = req.query.action;
    if (action === 'get_settings') return res.json({ success: true, data: readJson('site_settings.json', null) });
    if (action === 'save_settings') {
        writeJson('site_settings.json', req.body);
        return res.json({ success: true, message: 'Configurações salvas com sucesso!' });
    }
    if (action === 'get_blog') return res.json({ success: true, data: readJson('blog_posts.json', []) });
    if (action === 'save_blog') {
        writeJson('blog_posts.json', req.body);
        return res.json({ success: true, message: 'Blog atualizado com sucesso!' });
    }
    if (action === 'get_projects') return res.json({ success: true, data: readJson('projects.json', []) });
    if (action === 'save_projects') {
        writeJson('projects.json', req.body);
        return res.json({ success: true, message: 'Projetos atualizados com sucesso!' });
    }
    res.json({ status: 'online', api: '3Dígitos Node.js API' });
});

const { exec } = require('child_process');

// 4. Sincronização Instantânea com o GitHub
app.all('/api/sync-github', (req, res) => {
    exec('git fetch origin main && git reset --hard origin/main', { cwd: __dirname }, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message, stderr });
        }
        res.json({ success: true, message: 'Site sincronizado com o GitHub!', output: stdout.trim() });
    });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`[3Dígitos] Servidor ativo em http://localhost:${PORT}`);
});
