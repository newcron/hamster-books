<?php


namespace hamstersbooks\api\book;


use Flight;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\api\DatabaseConnectionFactory;
use hamstersbooks\util\persistence\QueryExecutor;

class ReadBookController
{
    public function __invoke($id, QueryExecutor $executor) {
        $result = (new BookFormatConverter())->convertList($executor->fetchAll(new FindBookByIdQuery($id)));

        if(sizeof($result)==1) {
            ApiResponse::ok()->withJsonContent($result[0])->send();
        } else if(sizeof($result)==0) {
            ApiResponse::notFound()->send();
        } else {
            ApiResponse::internalServerError()->withJsonContent(["message"=>"ambiguous results"])->send();
        }
        
    }

    public static function handle() {
        return function($id) {
            (new ReadBookController())->__invoke($id, QueryExecutor::usingExistingConnection());
        };
    }
}