<?php


namespace hamstersbooks\api\auth;



use Birke\Rememberme\Authenticator;
use hamstersbooks\api\DatabaseConnectionFactory;

class AccessVerifier
{

    private $mail;

    /**
     * AccessVerifier constructor.
     * @param $mail
     */
    public function __construct($mail)
    {
        $this->mail = $mail;
    }


    public function mayAccess() {
        if($this->mail === null) {
            return false;
        }

        return array_search(strtolower($this->mail), explode(";", strtolower(OAUTH_ALLOWED_USER_MAILS))) !== false;
    }


    public static function fromSession() {
        if(!isset($_SESSION["user"])) {
            return new AccessVerifier(null);
        }

        return new AccessVerifier($_SESSION["user"]["email"]);
    }

    public static function fromRememberMe() {
        $authenticator = new Authenticator(new HamstersBooksRememberMeStorage(DatabaseConnectionFactory::retrieveDatabase()));

        $loginResult = $authenticator->login();
        if($loginResult !== false) {
            $user = $loginResult;
            $_SESSION["user"] = ["email" => $user];
            session_regenerate_id(true);
        }

        return static::fromSession();
    }


}