<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhost", "root", "", "calmamente");

    if ($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Falha na conexão']));
        exit;
    }

    $id = $_POST['id'] ?? null;
    
    if (!$id) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'ID não fornecido']);
        exit;
    }
    
    $stmt = $conn->prepare("UPDATE usuarios SET online = 'nao', em_conversa = 'nao', aceitou_convite = 'nao' WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'ok', 'mensagem' => 'Usuário desconectado com sucesso']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao atualizar status']);
    }
    
    $stmt->close();
    $conn->close();
    
?>