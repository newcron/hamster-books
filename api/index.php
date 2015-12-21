<?php
header("Content-Type: application/json; charset=utf8", true);
require_once "../constants.php";
require_once "mysql_connect.php";

require 'flight/Flight.php';
require "books.php";
require "amazon/search_amazon.php";
require "authors.php";

Flight::route('GET /book', 'listAllBooksController');
Flight::route('GET /book/@id', 'getBookController');
Flight::route('GET /book/search/@isbn', 'searchBook');
Flight::route('POST /book', 'createBookController');
Flight::route('POST /book/@id', 'updateBookController');
Flight::route('GET /book/all/@state', 'listBooksByStateController');
Flight::route('GET /author', 'listAllAuthorsController');
Flight::route('POST /author', 'saveAuthorController');

Flight::start();
?>