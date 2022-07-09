<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\booklist\BookListService;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseAllBooksController
{
    public function __invoke(QueryExecutor $executor)
    {

        $bookList = (new BookListService())->getSelectedList();
        $result = $executor->fetchAll(new FindAllBooksQuery($bookList));

        ApiResponse::ok()->withJsonContent(
            [
                "list" => $bookList,
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
