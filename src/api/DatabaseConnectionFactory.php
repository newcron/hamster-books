<?php


namespace hamstersbooks\api;


use Flight;

class DatabaseConnectionFactory
{
    static $pdo;

    public static function registerDatabase($host, $database, $user, $pass)
    {
        if (static::$pdo !== null) {
            throw new \Exception("Can't initialize database twice (connection already established)");
        }

        if (empty($host)) {
            throw new \InvalidArgumentException("Host may not be null");
        }
        if (empty($database)) {
            throw new \InvalidArgumentException("Database may not be null");
        }

        try {
            static::$pdo = new \PDO("mysql:host=$host;dbname=$database;charset=utf8", $user, $pass);
        } catch (\PDOException $e) {
            throw new \Exception("Could not connect to mysql:host=$host;dbname=$database;charset=utf8", 1, $e);
        }

    }


    public static function retrieveDatabase()
    {
        return static::$pdo;
    }
}