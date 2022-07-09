<?php


namespace hamstersbooks\api\auth;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class AuthController
{

    public function __invoke(QueryExecutor $queryExecutor)
    {
        if (AccessVerifier::fromSession()->mayAccess()) {
            return true;
        }

        if (AccessVerifier::fromRememberMe()->mayAccess()) {
            return true;
        }

        ApiResponse::unauthorized()->withJsonContent(["login" => APP_BASE_URL . "login.html"])->send();

        return false;
    }

    public static function handle()
    {
        return function () {
            return (new AuthController())->__invoke(QueryExecutor::usingExistingConnection());
        };
    }

}
