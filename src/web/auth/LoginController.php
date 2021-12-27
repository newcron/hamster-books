<?php


namespace hamstersbooks\web\auth;


use hamstersbooks\api\auth\AccessVerifier;
use hamstersbooks\api\output\ApiResponse;
use League\OAuth2\Client\Provider\Google;

class LoginController
{


    public static function handle()
    {
        return function () {
            (new LoginController())->__invoke();
        };
    }

    public function __invoke()
    {
        if (AccessVerifier::fromSession()->mayAccess()) {
            ApiResponse::found(APP_BASE_URL)->send();
            return;
        }

        $provider = new Google([
            'clientId' => OAUTH_APP_ID,
            'clientSecret' => OAUTH_SECRET,
            'redirectUri' => APP_BASE_URL . "login-return.html",
        ]);


        $authUrl = $provider->getAuthorizationUrl([
            'scope' => ['email'],
        ]);

        ApiResponse::found($authUrl)->send();
    }

}
