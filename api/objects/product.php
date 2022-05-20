<?php
namespace object;

class Product
{
    private $conn;
    private $table_name = 'products';

    public $id;
    public $title;
    public $image;
    public $price;
    public $in_stock;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY title DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}