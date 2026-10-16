// =========================================================================
// 3DÍGITOS DRIVE - MOTOR DE ARMAZENAMENTO INDEXEDDB DE ALTA CAPACIDADE
// Suporta arquivos grandes (PDFs, ZIPs, Vídeos, Imagens, Códigos) sem o limite de 5MB do localStorage.
// =========================================================================

const DriveStorage = (function() {
    const DB_NAME = 'PortalDriveDB';
    const DB_VERSION = 1;
    let dbInstance = null;

    function openDB() {
        return new Promise((resolve, reject) => {
            if (dbInstance) return resolve(dbInstance);

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = function(e) {
                const db = e.target.result;

                // Tabela de Pastas
                if (!db.objectStoreNames.contains('folders')) {
                    const folderStore = db.createObjectStore('folders', { keyPath: 'id' });
                    folderStore.createIndex('parentId', 'parentId', { unique: false });
                }

                // Tabela de Arquivos
                if (!db.objectStoreNames.contains('files')) {
                    const fileStore = db.createObjectStore('files', { keyPath: 'id' });
                    fileStore.createIndex('folderId', 'folderId', { unique: false });
                    fileStore.createIndex('shareId', 'shareId', { unique: true });
                }
            };

            request.onsuccess = function(e) {
                dbInstance = e.target.result;
                resolve(dbInstance);
            };

            request.onerror = function(e) {
                console.error('Erro ao abrir IndexedDB do Drive:', e);
                reject(e);
            };
        });
    }

    // Criar pasta
    async function createFolder(name, parentId = 'root') {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('folders', 'readwrite');
            const store = tx.objectStore('folders');

            const folder = {
                id: 'folder_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                name: name.trim(),
                parentId: parentId,
                createdAt: new Date().toISOString()
            };

            const req = store.add(folder);
            req.onsuccess = () => resolve(folder);
            req.onerror = () => reject(req.error);
        });
    }

    // Listar pastas por parentId
    async function getFolders(parentId = 'root') {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('folders', 'readonly');
            const store = tx.objectStore('folders');
            const index = store.index('parentId');
            const req = index.getAll(parentId);

            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    // Buscar todas as pastas
    async function getAllFolders() {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('folders', 'readonly');
            const store = tx.objectStore('folders');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    // Renomear pasta
    async function renameFolder(id, newName) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('folders', 'readwrite');
            const store = tx.objectStore('folders');
            const getReq = store.get(id);

            getReq.onsuccess = () => {
                const folder = getReq.result;
                if (!folder) return reject(new Error('Pasta não encontrada'));
                folder.name = newName.trim();
                const putReq = store.put(folder);
                putReq.onsuccess = () => resolve(folder);
                putReq.onerror = () => reject(putReq.error);
            };
            getReq.onerror = () => reject(getReq.error);
        });
    }

    // Excluir pasta e seus arquivos recursivamente
    async function deleteFolder(folderId) {
        const db = await openDB();
        // Excluir arquivos da pasta
        const files = await getFiles(folderId);
        for (const file of files) {
            await deleteFile(file.id);
        }

        // Excluir subpastas recursivamente
        const subfolders = await getFolders(folderId);
        for (const sub of subfolders) {
            await deleteFolder(sub.id);
        }

        return new Promise((resolve, reject) => {
            const tx = db.transaction('folders', 'readwrite');
            const store = tx.objectStore('folders');
            const req = store.delete(folderId);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    }

    // Salvar Arquivo
    async function saveFile(browserFile, folderId = 'root') {
        const db = await openDB();

        // Gerar um shareId curto e amigável
        const shareId = 'share_' + Math.random().toString(36).substr(2, 9);
        const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

        return new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');

            const fileRecord = {
                id: fileId,
                name: browserFile.name,
                size: browserFile.size,
                type: browserFile.type || 'application/octet-stream',
                folderId: folderId,
                shareId: shareId,
                createdAt: new Date().toISOString(),
                blob: browserFile // IndexedDB aceita diretamente objetos Blob e File
            };

            const req = store.add(fileRecord);
            req.onsuccess = () => resolve(fileRecord);
            req.onerror = () => reject(req.error);
        });
    }

    // Listar arquivos por pasta
    async function getFiles(folderId = 'root') {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readonly');
            const store = tx.objectStore('files');
            const index = store.index('folderId');
            const req = index.getAll(folderId);

            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    // Obter todos os arquivos (para estatísticas e busca global)
    async function getAllFiles() {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readonly');
            const store = tx.objectStore('files');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    // Obter arquivo por ID ou ShareID
    async function getFile(fileId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readonly');
            const store = tx.objectStore('files');
            const req = store.get(fileId);

            req.onsuccess = () => {
                if (req.result) return resolve(req.result);
                // Se não achou por ID primário, busca pelo shareId
                const shareIndex = store.index('shareId');
                const shareReq = shareIndex.get(fileId);
                shareReq.onsuccess = () => resolve(shareReq.result || null);
                shareReq.onerror = () => reject(shareReq.error);
            };
            req.onerror = () => reject(req.error);
        });
    }

    // Excluir arquivo
    async function deleteFile(fileId) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');
            const req = store.delete(fileId);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    }

    // Renomear arquivo
    async function renameFile(fileId, newName) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');
            const getReq = store.get(fileId);

            getReq.onsuccess = () => {
                const file = getReq.result;
                if (!file) return reject(new Error('Arquivo não encontrado'));
                file.name = newName.trim();
                const putReq = store.put(file);
                putReq.onsuccess = () => resolve(file);
                putReq.onerror = () => reject(putReq.error);
            };
            getReq.onerror = () => reject(getReq.error);
        });
    }

    // Obter estatísticas do Drive
    async function getStats() {
        const allFiles = await getAllFiles();
        const allFolders = await getAllFolders();

        const totalBytes = allFiles.reduce((acc, f) => acc + (f.size || 0), 0);
        const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);

        return {
            filesCount: allFiles.length,
            foldersCount: allFolders.length,
            totalBytes: totalBytes,
            totalMb: totalMb
        };
    }

    // Formatar bytes para visualização amigável
    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Determinar ícone e cor por extensão
    function getFileVisual(fileName, fileType) {
        const ext = (fileName.split('.').pop() || '').toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext) || (fileType && fileType.startsWith('image/'))) {
            return { icon: '🖼️', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200', category: 'Imagem' };
        }
        if (ext === 'pdf' || (fileType && fileType.includes('pdf'))) {
            return { icon: '📄', color: 'text-red-500', bg: 'bg-red-50 border-red-200', category: 'PDF' };
        }
        if (['mp4', 'mov', 'avi', 'mkv'].includes(ext) || (fileType && fileType.startsWith('video/'))) {
            return { icon: '🎬', color: 'text-purple-500', bg: 'bg-purple-50 border-purple-200', category: 'Vídeo' };
        }
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
            return { icon: '📦', color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200', category: 'Arquivo Comprimido' };
        }
        if (['js', 'py', 'json', 'html', 'css', 'sql', 'sh'].includes(ext)) {
            return { icon: '💻', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200', category: 'Código / Script' };
        }
        if (['doc', 'docx', 'txt', 'rtf', 'md'].includes(ext)) {
            return { icon: '📝', color: 'text-cyan-500', bg: 'bg-cyan-50 border-cyan-200', category: 'Documento' };
        }
        if (['xls', 'xlsx', 'csv'].includes(ext)) {
            return { icon: '📊', color: 'text-green-600', bg: 'bg-green-50 border-green-200', category: 'Planilha' };
        }

        return { icon: '📁', color: 'text-slate-500', bg: 'bg-slate-50 border-slate-200', category: 'Arquivo' };
    }

    // Criar pastas padrão se o Drive estiver completamente vazio
    async function seedDefaultFoldersIfEmpty() {
        const folders = await getAllFolders();
        if (folders.length === 0) {
            await createFolder('📚 Materiais e E-books', 'root');
            await createFolder('💼 Propostas e Contratos', 'root');
            await createFolder('⚙️ Scripts e Automações', 'root');
            await createFolder('🎨 Logotipos e Identidade Visual', 'root');
        }
    }

    return {
        openDB,
        createFolder,
        getFolders,
        getAllFolders,
        renameFolder,
        deleteFolder,
        saveFile,
        getFiles,
        getAllFiles,
        getFile,
        deleteFile,
        renameFile,
        getStats,
        formatBytes,
        getFileVisual,
        seedDefaultFoldersIfEmpty
    };
})();
