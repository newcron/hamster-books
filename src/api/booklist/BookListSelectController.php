<?php

namespace hamstersbooks\api\booklist;

use hamstersbooks\api\output\ApiResponse;

class BookListSelectController
{
    public function __invoke($json, BookListService $service)
    {
        $lists = $service->getAllLists();
        foreach ($lists as $list) {
            if ($list->getId() == $json["id"]) {
                $service->setSelectedList($list);
                ApiResponse::ok()->withJsonContent([
                    "selected" => $list,
                ])->send();
                return;
            }
        }

        ApiResponse::internalServerError()->withJsonContent([
            "receivedData" => $json
        ])->send();

    }

    public static function handle()
    {
        return function () {
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            (new BookListSelectController())->__invoke($input, new BookListService());
        };
    }

}
