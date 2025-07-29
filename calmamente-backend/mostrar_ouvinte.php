<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhost","root","","calmamente");

    if ($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Erro ao conectar ao banco de dados']));
        exit;
    }

    $sql = "SELECT id, apelido FROM usuarios
            WHERE tipo_perfil = 'Ouvir'
            AND em_conversa = 'nao'
            AND ( aceitou_convite = 'sim' OR (notificacoes = 'nao' AND online_perfil = 'sim'))";
    
    $result = $conn->query($sql);

    $ouvinte = [];

    while ($row = $result->fetch_assoc()){
        $ouvinte[] = [
            'id' => $row['id'],
            'apelido' => $row['apelido'] ?: 'Anônimo'
        ];
    }

    echo json_encode(['status' => 'ok', 'ouvinte' => $ouvinte]);

    $conn->close();
?>