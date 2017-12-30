<?php


namespace hamstersbooks\api\auth;


use Birke\Rememberme\Storage\PDO;

class HamstersBooksRememberMeStorage extends PDO
{
    public function __construct(\PDO $connection)
    {
        parent::__construct([]);
        $this->setTableName("remember_me");
        $this->setCredentialColumn("credential");
        $this->setTokenColumn("token");
        $this->setPersistentTokenColumn("persistentToken");
        $this->setExpiresColumn("expires");
        $this->setConnection($connection);
    }


}