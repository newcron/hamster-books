<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\BookAuthorEtagQuery;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseBooksController
{
    public function __invoke($state, QueryExecutor $executor, Etag $passedTag)
    {
        $etag = $executor->fetchUnique(new BookAuthorEtagQuery())->{"etag"};
        if($passedTag->equals($etag)) {
            ApiResponse::notModified()->send();
            return;
        }

        $result = $executor->fetchAll(new FindBooksByStateQuery($state));

        // php sends pragma: no-cache header by default effectively disallowing browsers to use etag.
        header_remove("Pragma");
        ApiResponse::ok()->withJsonContent($result)->withHeader("ETag", sprintf('"%s"', $etag))->withHeader("Cache-Control", '"max-age=0, must-revalidate"')->send();
    }

    public static function handle()
    {
        return function ($state) {
            (new BrowseBooksController())->__invoke($state, QueryExecutor::usingExistingConnection(), Etag::fromServerArray());
        };
    }
}