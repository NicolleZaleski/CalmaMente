<?php 
    header("Content-Type: application/json");

    $conn = new mysqli("localhos","root","","calmamente");

    if ($conn->connect_error){
        die(json_encode(['status' => 'erro', 'mensagem' => 'Erro ao conectar com o banco de dados'])).
        exit;
    }

    $sql = "SELECT id, apelido FROM usuarios
            WHERE tipo_perfil = 'Ouvir'
            AND em_conversa ='nao'
            AND notificacoes = 'sim'
            AND online_perfil = 'sim'";

    $resultado = $conn->query($sql);

    $ouvintes_notificados = [];

    if ($resultado && $resultado->num_rows > 0){
        while ($ouvinte = $resutado->fetch_assoc()){
            //guarda os id para enviar notificação
            $ouvintes_notificados[] = [
                'id' => $ouvintes['id'],
                'apelido' => $ouvinte['apelido'] ?: 'Anônimo'
            ];
        }

        echo json_encode(['status' => 'ok', 'mensagem' => 'Notificações enviadas para ouvintes disponíveis', 'ouvinte' => $ouvintes_notificados]);
    } else{
        echo json_encode(['status' => 'erro', 'mensagem' => 'Nenhum ouvinte disponível no momento']);
    }

    $conn->close();

?>