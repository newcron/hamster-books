<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class AddBookController
{
    public function __invoke(array $params, QueryExecutor $executor)
    {
        $executor->execute(new InsertBookQuery($params));
        ApiResponse::created()->send();
    }

    public static function handle()
    {
        return function () {
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            (new AddBookController())->__invoke($input, QueryExecutor::usingExistingConnection());
        };
    }
}
