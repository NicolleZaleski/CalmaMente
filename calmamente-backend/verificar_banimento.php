<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "calmamente");

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID ausente']);
    exit;
}

$stmt = $conn->prepare("SELECT denuncias FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($denuncias);
$stmt->fetch();
$stmt->close();

if ($denuncias >= 5) {
    echo json_encode(['status' => 'banido']);
} else {
    echo json_encode(['status' => 'ok']);
}

$conn->close();
?>