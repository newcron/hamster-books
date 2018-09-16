<?php


namespace hamstersbooks\deploy;


use dbmigrate\application\sql\SqlFile;
use dbmigrate\MigrateDryRun;
use hamstersbooks\api\output\ApiResponse;

class DryRunController
{
    use MigrationKind;

    public function __invoke()
    {
        /** @var SqlFile[] $sqlFilesToExecute */
        $sqlFilesToExecute = call_user_func(new MigrateDryRun($this->pdo, $this->getMigrationDirectory()));
        ApiResponse::ok()->withJsonContent(array_map(function (SqlFile $file) {
            return [
                "file" => $file->getFile()->getFilename(),
                "hash" => $file->getHash()
            ];
        }, $sqlFilesToExecute))->send();
    }

}