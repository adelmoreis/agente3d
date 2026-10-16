<?php
/**
 * 3Dígitos - API de Persistência Leve para VPS Hostinger
 * Permite atualizar configurações da vitrine, notícias do blog e projetos direto pelo navegador.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';
$dataDir = __DIR__ . '/data';

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function getJsonFile($filePath, $default = []) {
    if (!file_exists($filePath)) {
        return $default;
    }
    $content = file_get_contents($filePath);
    $data = json_decode($content, true);
    return ($data !== null) ? $data : $default;
}

function saveJsonFile($filePath, $data) {
    return file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

switch ($action) {
    // 1. Configurações Gerais do Site (Contatos, Banner, Textos, Redes)
    case 'get_settings':
        $settingsFile = $dataDir . '/site_settings.json';
        $settings = getJsonFile($settingsFile, null);
        echo json_encode(['success' => true, 'data' => $settings]);
        break;

    case 'save_settings':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
            exit;
        }
        $settingsFile = $dataDir . '/site_settings.json';
        saveJsonFile($settingsFile, $input);
        echo json_encode(['success' => true, 'message' => 'Configurações salvas com sucesso!', 'updated_at' => date('Y-m-d H:i:s')]);
        break;

    // 2. Matérias do Blog
    case 'get_blog':
        $blogFile = $dataDir . '/blog_posts.json';
        $posts = getJsonFile($blogFile, []);
        echo json_encode(['success' => true, 'data' => $posts]);
        break;

    case 'save_blog':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!is_array($input)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
            exit;
        }
        $blogFile = $dataDir . '/blog_posts.json';
        saveJsonFile($blogFile, $input);
        echo json_encode(['success' => true, 'message' => 'Blog atualizado com sucesso!']);
        break;

    // 3. Projetos da Vitrine
    case 'get_projects':
        $projFile = $dataDir . '/projects.json';
        $projects = getJsonFile($projFile, []);
        echo json_encode(['success' => true, 'data' => $projects]);
        break;

    case 'save_projects':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!is_array($input)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
            exit;
        }
        $projFile = $dataDir . '/projects.json';
        saveJsonFile($projFile, $input);
        echo json_encode(['success' => true, 'message' => 'Projetos atualizados com sucesso!']);
        break;

    default:
        echo json_encode([
            'status' => 'online',
            'api' => '3Dígitos Portal API',
            'version' => '1.0',
            'time' => date('Y-m-d H:i:s')
        ]);
        break;
}
