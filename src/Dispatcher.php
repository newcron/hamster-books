<?php

namespace hamstersbooks;

use Flight;
use hamstersbooks\api\DatabaseConnectionFactory;

class Dispatcher
{
    public function dispatch()
    {

        session_start();
        (new DatabaseConnectionFactory())->registerDatabase(DB_HOST, DB_DATABASE, DB_USER, DB_PASS);
        try {


            $routingTable = require(__DIR__ . "/routing.php");
            foreach ($routingTable as $path => $handler) {
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
