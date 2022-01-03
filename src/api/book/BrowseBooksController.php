<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseBooksController
{
    public function __invoke($state, QueryExecutor $executor)
    {

        $result = $executor->fetchAll(new FindBooksByStateQuery($state));
        
        ApiResponse::ok()->withJsonContent(
            [ 
                "books"=> (new BookFormatConverter())->convertList($result)
            ]         
            )->send();
    }

    public static function handle()
    {
        return function ($state) {
            (new BrowseBooksController())->__invoke($state, QueryExecutor::usingExistingConnection());
        };
    }
}