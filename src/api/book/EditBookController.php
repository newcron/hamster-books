<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class EditBookController
{
    public function __invoke(array $params, QueryExecutor $executor)
    {
        $executor->execute(new UpdateBookQuery($params));
        ApiResponse::created()->send();
    }

    public static function handle()
    {
        return function () {
            (new EditBookController())->__invoke($_POST, QueryExecutor::usingExistingConnection());
        };
    }
}