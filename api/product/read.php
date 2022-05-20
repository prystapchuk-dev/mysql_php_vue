<?php

use config\Database;
use object\Product;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json; charset=UTF-8');

include_once '../config/database.php';
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$stmt = $product->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $products_arr = [];
    $products_arr['records'] = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_item = [
            'id' => $id,
            'title' => $title,
            'image' => $image,
            'price' => $price,
            'in_stock' => $in_stock,
        ];

        $products_arr['records'][] = $product_item;
    }

    http_response_code(200);

    echo json_encode($products_arr);


} else {
    http_response_code(404);

    echo json_encode(['message' => 'Товари не знайдені!']);
}