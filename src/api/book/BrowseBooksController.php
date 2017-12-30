<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseBooksController
{
    public function __invoke($state, QueryExecutor $executor)
    {
        /*
        $etag = $executor->fetchUnique(new BookAuthorEtagQuery())->{"etag"};
        if($passedTag->equals($etag)) {
            ApiResponse::notModified()->send();
            return;
        }
*/
        $result = $executor->fetchAll(new FindBooksByStateQuery($state));

        // php sends pragma: no-cache header by default effectively disallowing browsers to use etag.
        # header_remove("Pragma");
        # ->withHeader("ETag", sprintf('"%s"', $etag))->withHeader("Cache-Control", '"max-age=3600, must-revalidate"')
        ApiResponse::ok()->withJsonContent($result)->send();
    }

    public static function handle()
    {
        return function ($state) {
            (new BrowseBooksController())->__invoke($state, QueryExecutor::usingExistingConnection());
        };
    }
}