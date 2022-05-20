<?php

namespace config;

class Database
{
    private $host = 'localhost';
    private $host_port = '8889';
    private $db_name = 'api_base';
    private $user_name = 'root';
    private $password = 'root';

    public $conn = null;

    public function getConnection()
    {
        try {
            $this->conn = new \PDO('mysql:host=' . $this->host . ':' . $this->host_port . ';dbname=' . $this->db_name, $this->user_name, $this->password);
            $this->conn->exec('set names utf8');
        } catch (\PDOException $exception) {
            echo 'Помилка зєднання з базою даних' . $exception->getMessage();
        }
        return $this->conn;
    }

}