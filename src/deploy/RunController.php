<?php


namespace hamstersbooks\deploy;


use dbmigrate\application\sql\SqlFile;
use dbmigrate\Migrate;
use dbmigrate\MigrateDryRun;
use hamstersbooks\api\output\ApiResponse;

class RunController
{
    use MigrationKind;

    public function __invoke()
    {
        call_user_func(new Migrate($this->pdo, $this->getMigrationDirectory()));
        ApiResponse::ok()->send();
    }

}