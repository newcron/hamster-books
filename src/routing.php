<?php


use hamstersbooks\api\auth\AuthController;
use hamstersbooks\api\author\BrowseAuthorsController;
use hamstersbooks\api\author\GetAuthorsBibliographyController;
use hamstersbooks\api\book\AddEditBookController;
use hamstersbooks\api\book\BrowseAllBooksController;
use hamstersbooks\api\book\BrowseBooksByStateController;
use hamstersbooks\api\book\ReadBookController;
use hamstersbooks\api\book\SearchBookOnAmazonController;
use hamstersbooks\api\book\SearchBookOnAmazonNewController;
use hamstersbooks\api\booklist\BookListController;
use hamstersbooks\api\booklist\BookListSelectController;
use hamstersbooks\deploy\DryRunController;
use hamstersbooks\deploy\InitializeMigrationsController;
use hamstersbooks\deploy\RunController;
use hamstersbooks\web\auth\AuthorizeController;
use hamstersbooks\web\auth\LoginController;
use hamstersbooks\web\auth\LoginReturnController;
use hamstersbooks\web\IndexController;

return [
    "GET|POST /api/*" => AuthController::handle(),
    'GET /api/book/by-id/@id' => ReadBookController::handle(),
    'GET /api/book/all' => BrowseAllBooksController::handle(),
    'GET /api/book/all/by-state/@state' => BrowseBooksByStateController::handle(),
    'GET /api/book/search/@isbn' => SearchBookOnAmazonController::handle(),

    "GET /api/book-list/" => BookListController::handle(),
    "POST /api/book-list/current" => BookListSelectController::handle(),


    'POST /api/book/' => AddEditBookController::handle(),
    'GET /api/author' => BrowseAuthorsController::handle(),
    'GET /api/author/@ids/bibliography' => GetAuthorsBibliographyController::handle(),

    'GET /deploy/database/init' => InitializeMigrationsController::handle(),
    'GET /deploy/database/migrate/dry-run' => DryRunController::handle(),
    'GET /deploy/database/migrate/run' => RunController::handle(),

    'GET /' => IndexController::handle(),
    'GET /login.html' => LoginController::handle(),
    'GET /login-return.html' => LoginReturnController::handle(),
    'GET /authorize.html' => AuthorizeController::handle(),
    'GET /phpinfo.html' => function () {
        return phpinfo();
    }
];
