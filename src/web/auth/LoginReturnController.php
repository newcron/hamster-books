<?php


namespace hamstersbooks\web\auth;


use hamstersbooks\api\output\ApiResponse;
use League\OAuth2\Client\Provider\Google;

class LoginReturnController
{


    public static function handle()
    {
        return function () {
            (new LoginReturnController())->__invoke();
        };
    }

    public function __invoke()
    {
        $provider = new Google([
            'clientId' => OAUTH_APP_ID,
            'clientSecret' => OAUTH_SECRET,
            'redirectUri' => APP_BASE_URL . "login-return.html",
        ]);

        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        $_SESSION["oauth.token"] = $token;

        ApiResponse::found(APP_BASE_URL . "authorize.html")->send();

    }

}
