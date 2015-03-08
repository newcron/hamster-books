<?php
require_once 'flight/Flight.php';

function listAllBooksController() {
    echo json_encode(listBooks());
}

function getBookController($id) {
    echo json_encode(getBook($id));
}

function updateBookController($id) {
    echo json_encode(updateBook(createDataObjectFromPost()));
}

function listBooksByStateController($state) {
    echo json_encode(listBooks($state));
}

function createBookController() {
    echo json_encode(createBook(createDataObjectFromPost()));
}

?>