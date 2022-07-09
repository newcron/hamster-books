<?php

namespace hamstersbooks\api\booklist;

use hamstersbooks\api\output\ApiResponse;

class BookListController
{
    public function __invoke(BookListService $service)
    {

        return ApiResponse::ok()->withJsonContent([
            "all" => $service->getAllLists()
        ])->send();

    }

    public static function handle()
    {
        return fn() => (new BookListController())->__invoke(new BookListService());
    }

}
