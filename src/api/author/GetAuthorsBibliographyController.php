<?php


namespace hamstersbooks\api\author;


use hamstersbooks\api\book\BookFormatConverter;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class GetAuthorsBibliographyController
{
    public function __invoke($ids, QueryExecutor $executor)
    {

        $result = $executor->fetchAll(new GetAuthorsBibliographyQuery($ids));


        ApiResponse::ok()->withJsonContent(
            [
                "references" => (new BookFormatConverter())->convertList($result)
            ]
        )->send();
    }

    public static function handle()
    {
        return function ($ids) {
            (new GetAuthorsBibliographyController())->__invoke(explode(",", $ids), QueryExecutor::usingExistingConnection());

        };
    }
}
