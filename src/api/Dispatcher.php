<?php
namespace hamstersbooks\api;

use Flight;
use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\web\auth\AuthorizeController;
use hamstersbooks\web\auth\LoginController;
use hamstersbooks\web\auth\LoginReturnController;
use hamstersbooks\api\author\AddAuthorController;
use hamstersbooks\api\author\BrowseAuthorsController;
use hamstersbooks\api\book\AddBookController;
use hamstersbooks\api\book\EditBookController;
use hamstersbooks\api\book\ReadBookController;
use hamstersbooks\api\book\BrowseBooksController;
use hamstersbooks\api\book\SearchBookOnAmazonController;
use hamstersbooks\web\IndexController;

class Dispatcher
{
    public function dispatch()
    {

        session_start();
        (new DatabaseConnectionFactory())->registerDatabase(DB_HOST, DB_DATABASE, DB_USER, DB_PASS);
        try {


            Flight::route('GET /', IndexController::handle());


            Flight::route("GET|POST /api/*", function () {
                if (AccessVerifier::fromSession()->mayAccess()) {
                    return true;
                }

                ApiResponse::unauthorized()->withJsonContent(["login" => APP_BASE_URL . "login.html"])->send();

                return false;
            });

            Flight::route('GET /api/book/@id', ReadBookController::handle());

            Flight::route('GET /api/book/all/@state', BrowseBooksController::handle());
            Flight::route('GET /api/book/search/@isbn', SearchBookOnAmazonController::handle());
            Flight::route('POST /api/book', AddBookController::handle());
            Flight::route('POST /api/book/@id', EditBookController::handle());
            Flight::route('GET /api/author', BrowseAuthorsController::handle());
            Flight::route('POST /api/author', AddAuthorController::handle());
            Flight::route('GET /login.html', LoginController::handle());
            Flight::route('GET /login-return.html', LoginReturnController::handle());
            Flight::route('GET /authorize.html', AuthorizeController::handle());

            Flight::route('GET /api/phpinfo', function () {
                header("Content-Type: text/html; charset=utf8", true);
                echo phpinfo();
            });

            Flight::map('notFound', function () {
                echo json_encode(["path" => Flight::request()]);
                http_response_code(404);
            });


            Flight::start();

        } catch (\Exception $e) {
            echo json_encode([
                'error' => array(
                    'code' => $e->getCode(),
                    'message' => $e->getMessage(),
                    'stacktrace' => $e->getTraceAsString()
                )
            ]);
            http_response_code(500);
        }
    }
}