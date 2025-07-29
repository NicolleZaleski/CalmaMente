<?php 
    header("Content-Type: application/json");                                                   //reposta será em formato json

    $conn = new mysqli("localhost", "root", "", "calmamente");                                  //conexão com o banco de dados
    
    if ($conn->connect_error){
        die(json_encode(['status' => 'error', 'mensagem' => 'Erro na conexão']));
    }

    $id = $_POST['id'] ?? null;
    $novo_apelido = isset($_POST['apelido']) && trim($_POST['apelido']) !== '' ? trim($_POST['apelido']) : 'Anônimo';

    if (!$id){
        echo json_encode(['status' => 'erro', 'mensagem' => 'ID inválido']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE usuarios SET apelido = ? WHERE id = ?");
    $stmt->bind_param("si", $novo_apelido, $id);

    if($stmt->execute()) {
        echo json_encode(['status' => 'ok', 'mensagem' => 'Apelido atualizado com sucesso']);
    } else{
        echo json_encode(['status' => 'erro', 'mensagem' => 'Falha ao atualizar apelido']);
    }

    $stmt->close();
    $conn->close();

?>