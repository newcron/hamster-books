<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseAllBooksController
{
    public function __invoke(QueryExecutor $executor)
    {

        
        $result = $executor->fetchAll(new FindAllBooksQuery());

        ApiResponse::ok()->withJsonContent(
            [
                "books" => (new BookFormatConverter())->convertList($result)
            ]
        )->send();
    }

    public static function handle()
    {

        return function () {

            (new BrowseAllBooksController())->__invoke(QueryExecutor::usingExistingConnection());
        };
    }
}
