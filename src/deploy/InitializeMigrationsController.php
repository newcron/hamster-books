<?php


namespace hamstersbooks\deploy;


use dbmigrate\Initialize;
use hamstersbooks\api\output\ApiResponse;

class InitializeMigrationsController
{

    use MigrationKind;

    public function __invoke()
    {
        call_user_func(new Initialize($this->pdo));
        ApiResponse::created()->send();
    }

}