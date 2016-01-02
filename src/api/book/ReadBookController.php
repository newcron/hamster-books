<?php


namespace hamstersbooks\api\book;


use Flight;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\api\DatabaseConnectionFactory;
use hamstersbooks\util\persistence\QueryExecutor;

class ReadBookController
{
    public function __invoke($id, QueryExecutor $executor) {
        $result = $executor->fetchUnique(new FindBookByIdQuery($id));

        ApiResponse::ok()->withJsonContent($result)->send();
    }

    public static function handle() {
        return function($id) {
            (new ReadBookController())->__invoke($id, QueryExecutor::usingExistingConnection());
        };
    }
}