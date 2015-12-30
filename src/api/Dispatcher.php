<?php
namespace hamstersbooks\api;

use Flight;
use hamstersbooks\api\author\AddAuthorController;
use hamstersbooks\api\author\BrowseAuthorsController;
use hamstersbooks\api\book\AddBookController;
use hamstersbooks\api\book\EditBookController;
use hamstersbooks\api\book\ReadBookController;
use hamstersbooks\api\book\BrowseBooksController;
use hamstersbooks\api\book\SearchBookOnAmazonController;

class Dispatcher
{
    public function dispatch() {

        (new DatabaseConnectionFactory())->registerDatabase(DB_HOST, DB_DATABASE, DB_USER, DB_PASS);
        try {

            Flight::route('GET /api/book/@id', ReadBookController::handle());

            Flight::route('GET /api/book/all/@state', BrowseBooksController::handle());
            Flight::route('GET /api/book/search/@isbn', SearchBookOnAmazonController::handle());
            Flight::route('POST /api/book', AddBookController::handle());
            Flight::route('POST /api/book/@id', EditBookController::handle());
            Flight::route('GET /api/author', BrowseAuthorsController::handle());
            Flight::route('POST /api/author', AddAuthorController::handle());

            Flight::route('GET /api/phpinfo', function() {
                header("Content-Type: text/html; charset=utf8", true);
                echo phpinfo();
            });

            Flight::map('notFound', function(){
                echo json_encode(["path" => Flight::request()]);
                http_response_code(404);
            });


            Flight::start();

        } catch(\Exception $e) {
            echo json_encode(['error' => array(
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
                'stacktrace'=> $e->getTraceAsString()
            )]);
            http_response_code(500);
        }
    }
}