<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhost", "root", "", "calmamente");

    if ($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Falha na conexão']));
        exit;
    }

    $id_ouvinte = $_POST['id_ouvinte'] ?? null;

    if(!$id_ouvinte){
        echo json_encode(['status' => 'erro', 'mensagem' => 'ID ausente']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE usuarios SET aceitou_convite = 'nao' WHERE id = ?");
    $stmt->bind_param("i", $id_ouvinte);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'ok', 'mensagem' => 'Chat recusado']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao recusar']);
    }

    $stmt->close();
    $conn->close();
?>