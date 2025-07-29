<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhost", "root", "", "calmamente");

    if ($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Falha na conexão']));
        exit;
    }

    $id_usuario = $_POST['id_usuario'] ?? null;
    $id_outro = $_POST['id_outro'] ?? null;

    if (!$id_usuario || !$id_outro) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'IDs não fornecidos']);
        exit;
    }

    
    $stmt = $conn->prepare("UPDATE usuarios SET em_conversa = 'nao', aceitou_convite = 'nao' WHERE id IN (?, ?)");
    $stmt->bind_param("ii", $id_usuario, $id_outro);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'ok', 'mensagem' => 'Chat finalizado']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao finalizar o chat']);
    }

    $stmt->close();
    $conn->close();

    
?>