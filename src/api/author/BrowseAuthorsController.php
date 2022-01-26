<?php


namespace hamstersbooks\api\author;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class BrowseAuthorsController
{
    public function __invoke(QueryExecutor $executor)
    {
        $result= 
        ["authors"=> 
            array_map(fn($a)=>
                [
                    "id"=>intval($a->{"id"}), 
                    "firstName" => empty($a->{"first_name"}) ? null : $a->{"first_name"}, 
                    "middleName" => empty($a->{"middle_name"}) ? null : $a->{"middle_name"}, 
                    "lastName" => empty($a->{"last_name"}) ? null : $a->{"last_name"}, 
                ], $executor->fetchAll(new AllAuthorsQuery())
            )
        ]; 

        ApiResponse::ok()->withJsonContent($result)->send();
    }

    public static function handle()
    {
        return function () {
            $authors = (new BrowseAuthorsController())->__invoke(QueryExecutor::usingExistingConnection());
            
        };
    }
}