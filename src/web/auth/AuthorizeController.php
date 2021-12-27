<?php


namespace hamstersbooks\web\auth;


use Birke\Rememberme\Authenticator;
use hamstersbooks\api\auth\AccessVerifier;
use hamstersbooks\api\auth\HamstersBooksRememberMeStorage;
use hamstersbooks\api\DatabaseConnectionFactory;
use hamstersbooks\api\output\ApiResponse;
use League\OAuth2\Client\Provider\Google;
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

        $provider = new Google([
            'clientId' => OAUTH_APP_ID,
            'clientSecret' => OAUTH_SECRET,
            'redirectUri' => APP_BASE_URL . "login-return.html",
        ]);


        $user = $provider->getResourceOwner($token)->toArray();
        
        $email = strtolower($user["email"]);
        $isAuthorized = (new AccessVerifier($email))->mayAccess();

        if (!$isAuthorized) {
            # ApiResponse::forbidden()->send();

            return;
        }
        session_regenerate_id(true);
        $_SESSION["user"] = ["email" => $email];

        (new Authenticator(new HamstersBooksRememberMeStorage(DatabaseConnectionFactory::retrieveDatabase())))
            ->createCookie($email);


        ApiResponse::found(APP_BASE_URL)->send();
    }

}
