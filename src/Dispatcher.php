<?php
namespace hamstersbooks;

use Flight;
use hamstersbooks\api\auth\AuthController;
use hamstersbooks\api\DatabaseConnectionFactory;
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


            $routingTable = require(__DIR__."/routing.php");
            foreach ($routingTable as $path => $handler)
            {
                Flight::route($path, $handler);
            }

            Flight::map('notFound', function () {
                echo json_encode(["path" => Flight::request()]);
                http_response_code(404);
            });


            Flight::start();

        } catch (\Exception $e) {
            (new ErrorHandler())->handle($e);
        }
    }
}