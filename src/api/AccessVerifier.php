<?php


namespace hamstersbooks\api;


use League\OAuth2\Client\Token\AccessToken;

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

        return array_search($this->mail, explode(";", strtolower(OAUTH_ALLOWED_USER_MAILS))) !== false;
    }


    public static function fromSession() {
        if(!isset($_SESSION["user"])) {
            return new AccessVerifier(null);
        }

        return new AccessVerifier($_SESSION["user"]["email"]);
    }


}