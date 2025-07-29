<?php 
    header(("Content-Type: application/json"));
    $conn = new mysqli("localhost","root","","calmamente");
    
    if($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Erro ao conectar ao Banco de dados']));
    }

    $id = $_POST['id'] ?? null;
    $notificacao = $_POST['notificacoes'] ?? null;

    if (!$id || !in_array($notificacao, ['sim', 'nao'])) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Dados Inválido']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE usuarios SET notificacoes = ? WHERE id = ?");
    $stmt->bind_param("si", $notificacao, $id);

    if ($stmt->execute()){
        echo json_encode(['status' => 'ok', 'mensagem' => 'Notificação atualizada']);
    } else{
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao atualizar notificação']);
    }

    $stmt->close();
    $conn->close();

?>