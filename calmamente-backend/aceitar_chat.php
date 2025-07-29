<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhost", "root", "", "calmamente");

    if ($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Falha na conexão']));
        exit;
    }

    $id_desabafar = $_POST['id_desabafar'] ?? null;
    $id_ouvinte = $_POST['id_ouvinte'] ?? null;

    if (!$id_desabafar || !$id_ouvinte){
        echo json_encode(['status' => 'erro', 'mensagem' => 'IDs ausentes']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE usuarios SET em_conversa = 'sim' WHERE id IN (?,?)");
    $stmt->bind_param("ii",$id_desabafar, $id_ouvinte);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'ok', 'mensagem' => 'Usuários conectados']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao conectar usuários']);
    }

    $stmt->close();
    $conn->close();
?>