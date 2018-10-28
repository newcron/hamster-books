<?php


namespace hamstersbooks\web\auth;


use Birke\Rememberme\Authenticator;
use hamstersbooks\api\auth\AccessVerifier;
use hamstersbooks\api\auth\HamstersBooksRememberMeStorage;
use hamstersbooks\api\DatabaseConnectionFactory;
use hamstersbooks\api\output\ApiResponse;
use League\OAuth2\Client\Provider\Facebook;
use League\OAuth2\Client\Token\AccessToken;

class AuthorizeController
{


    public static function handle()
    {
        return function () {
            (new AuthorizeController())->__invoke($_SESSION["oauth.token"]);
        };
    }

    public function __invoke(AccessToken $token)
    {

        $provider = new Facebook([
            'clientId' => OAUTH_FB_APP_ID,
            'clientSecret' => OAUTH_FB_SECRET,
            'redirectUri' => APP_BASE_URL . "login-return.html",
            'graphApiVersion' => 'v2.8',
        ]);


        $user = $provider->getResourceOwner($token)->toArray();
        $email = strtolower($user["email"]);

        $isAuthorized = (new AccessVerifier($email))->mayAccess();

        if (!$isAuthorized) {
            ApiResponse::forbidden()->send();

            return;
        }
        session_regenerate_id(true);
        $_SESSION["user"] = $user;

        (new Authenticator(new HamstersBooksRememberMeStorage(DatabaseConnectionFactory::retrieveDatabase())))
            ->createCookie($email);


        ApiResponse::found(APP_BASE_URL)->send();
    }

}
