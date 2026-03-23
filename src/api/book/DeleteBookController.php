<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\booklist\BookListService;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class DeleteBookController
{
    public function __invoke($id, QueryExecutor $executor)
    {
        try {

            $executor->beginTransaction();
            $executor->execute(new UnassignAuthorFromBookQuery($id));
            $executor->execute(new DeleteBookByIdQuery($id));
            $executor->commitTransaction();
        } catch (\Exception $e) {
            $executor->rollbackTransaction();
            throw $e;
        }
        ApiResponse::created()->withJsonContent(["success" => true])->send();
    }

    public static function handle()
    {
        return function ($id) {
            (new DeleteBookController())->__invoke($id, QueryExecutor::usingExistingConnection());
        };
    }

}
