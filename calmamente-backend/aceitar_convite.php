<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhost","root","","calmamente");

    if($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Erro ao conectar no banco de dados']));
        exit;
    }

    $id_ouvinte = $_POST['id_ouvinte'] ?? null;

    if(!$id_ouvinte){
        echo json_encode(['status' => 'erro', 'mensagem' => 'ID do ouvinte não fornecido']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE usuarios SET aceitou_convite = 'sim' WHERE id = ?");
    $stmt->bind_param("i", $id_ouvinte);

    if ($stmt->execute()){
        echo json_encode(['status' => 'ok', 'mensagem' => 'Convite aceito']);
    } else{
        echo json_encode(['status' => 'erro', 'mensagem' => 'Falha ao atualizar o convite']);
    }

    $stmt->close();
    $conn->close();



?>