<?php


namespace hamstersbooks\web\auth;


use hamstersbooks\api\output\ApiResponse;
use League\OAuth2\Client\Provider\Facebook;

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
        $provider = new Facebook([
            'clientId' => OAUTH_FB_APP_ID,
            'clientSecret' => OAUTH_FB_SECRET,
            'redirectUri' => APP_BASE_URL . "login-return.html",
            'graphApiVersion' => 'v2.5',
        ]);

        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        $_SESSION["oauth.token"] = $token;

        ApiResponse::found(APP_BASE_URL . "authorize.html")->send();

    }

}