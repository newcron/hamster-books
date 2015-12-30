<?php


namespace hamstersbooks\api\author;


use hamstersbooks\api\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseAuthorsController
{
    public function __invoke(QueryExecutor $executor)
    {
        $result = $executor->fetchAll(new AllAuthorsQuery());

        ApiResponse::ok()->withContent($result)->send();
    }

    public static function handle()
    {
        return function () {
            (new BrowseAuthorsController())->__invoke(QueryExecutor::usingExistingConnection());
        };
    }
}