<?php


namespace hamstersbooks\web\auth;


use hamstersbooks\api\AccessVerifier;
use hamstersbooks\api\output\ApiResponse;
use League\OAuth2\Client\Provider\Facebook;

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

        $provider = new Facebook([
            'clientId' => OAUTH_FB_APP_ID,
            'clientSecret' => OAUTH_FB_SECRET,
            'redirectUri' => APP_BASE_URL . "login-return.html",
            'graphApiVersion' => 'v2.5',
        ]);


        $authUrl = $provider->getAuthorizationUrl([
            'scope' => ['email'],
        ]);

        ApiResponse::found($authUrl)->send();
    }

}