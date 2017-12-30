<?php


namespace hamstersbooks\deploy;


use hamstersbooks\api\DatabaseConnectionFactory;

trait MigrationKind
{

    /** @var \PDO */
    private $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public static function handle() {
        return function(){
            return call_user_func(new static(DatabaseConnectionFactory::retrieveDatabase()));
        };
    }

    private function getMigrationDirectory() {
        return new \SplFileInfo(__DIR__."/../../sql");
    }
}