<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\booklist\BookListService;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseBooksByStateController
{
    public function __invoke($state, QueryExecutor $executor)
    {

        $bookList = (new BookListService())->getSelectedList();
        $result = $executor->fetchAll(new FindBooksByStateQuery($state, $bookList));

        ApiResponse::ok()->withJsonContent(
            [
                "list" => $bookList,
                "books" => (new BookFormatConverter())->convertList($result)
            ]
        )->send();
    }

    public static function handle()
    {
        return function ($state) {
            (new BrowseBooksByStateController())->__invoke($state, QueryExecutor::usingExistingConnection());
        };
    }
}
