<?php  
    header("Content-Type: application/json");
    
    $conn = new mysqli("localhost","root","","calmamente");

    if($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Erro ao conectar ao banco de dados']));
    }

    $id = $_POST['id'] ?? null;
    if (!$id){
        echo json_encode(['status' => 'erro', 'mensagem' => 'ID inválido']);
        exit;
    }

    //atualiza denuncias
    $stmt = $conn->prepare("UPDATE usuarios SET denuncias = denuncias +1 WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    //verificar total de denúncias
    $stmt2 = $conn->prepare("SELECT denuncias FROM usuarios WHERE id = ?");
    $stmt2->bind_param("i", $id);
    $stmt2->execute();
    $stmt2->bind_result($denuncias);
    $stmt2->fetch();
    $stmt2->close();

    if ($denuncias >= 6) {
        echo json_encode([
            'status' => 'banido',
            'mensagem' => 'Voc~e foi denunciado. Por favor, use o app com respeito.'
        ]);
    } else{
        echo json_encode(['status' => 'ok', 'mensagem' => 'Usuário reportado com sucesso']);
    }

    $conn->close();
?>