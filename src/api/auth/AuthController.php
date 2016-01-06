<?php


namespace hamstersbooks\api\auth;


use hamstersbooks\api\output\ApiResponse;

class AuthController
{

    public function __invoke()
    {
        if (AccessVerifier::fromSession()->mayAccess()) {
            return true;
        }

        ApiResponse::unauthorized()->withJsonContent(["login" => APP_BASE_URL . "login.html"])->send();

        return false;
    }

    public static function handle()
    {
        return function () {
            return call_user_func(new AuthController());
        };
    }
}