<?php


namespace hamstersbooks\api\author;


use hamstersbooks\api\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;
use hamstersbooks\util\Strings;

class AddAuthorController
{

    public function __invoke(array $params, QueryExecutor $executor)
    {
        $first = isset($params["first_name"]) ? Strings::emptyToNull($params["first_name"]) : null;
        $middle = isset($params["middle_name"]) ? Strings::emptyToNull($params["middle_name"]) : null;
        $last = isset($params["last_name"]) ? Strings::emptyToNull($params["last_name"]) : null;


        $executor->execute(new InsertAuthorQuery($first, $middle, $last));


        ApiResponse::created()
            ->withContent($executor->fetchUnique(new FindLastInsertAuthorQuery()))
            ->send();

    }

    public static function handle()
    {
        return function () {
            (new AddAuthorController())->__invoke($_POST, QueryExecutor::usingExistingConnection());
        };
    }
}