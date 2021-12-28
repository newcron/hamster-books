<?php


namespace hamstersbooks\web;


use hamstersbooks\api\output\ApiResponse;

class IndexController
{
    public static function handle()
    {
        return function () {
            (new IndexController())->__invoke();
        };
    }

    public function __invoke()
    {
        ApiResponse::ok()->withHtmlContent(file_get_contents(VIEW_FILE))->send();

    }
}