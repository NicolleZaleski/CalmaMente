<?php 
    header("Content-Type: application/json");                                                   //reposta será em formato json

    $conn = new mysqli("localhost", "root", "", "calmamente");                                  //conexão com o banco de dados
    if ($conn->connect_error){
        die(json_encode(['status' => 'error', 'mensagem' => 'Erro na conexão']));
    }

    $apelido = isset($_POST['apelido']) && trim($_POST['apelido']) !== '' ? trim($_POST['apelido']) : 'Anônimo';
    $tipo = $_POST['tipo_perfil'] ?? 'Ouvinte';                                               //se o tipo não for enviado, ele assume o padrão "Desabafar"
    $notificacao = $tipo === "Ouvinte" ? ($_POST['notificacoes'] ?? 'sim') : 'nao';

    $stmt = $conn->prepare("INSERT INTO usuarios (apelido, tipo_perfil, notificacoes) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $apelido, $tipo, $notificacao);                                                   //define que ambos são string

    if ($stmt->execute()){
        echo json_encode([
            'status' => 'ok',
            'id_chat' => $stmt->insert_id,
            'apelido' => $apelido,
            'mensagem' => 'Usuário registrado com sucesso'
        ]);
    } else{
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao registrar usuário']);
    }

    $stmt->close();
    $conn->close();
?>