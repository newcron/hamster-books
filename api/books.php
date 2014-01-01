<?php
require_once 'flight/Flight.php';

function listAllBooksController() {
    echo json_encode(listBooks());
}

function getBookController($id) {
    echo json_encode(getBook($id));
}

function listBooksByStateController($state) {
    echo json_encode(listBooks($state));
}

function createBookController() {
    global $mysqli;
    $object = new stdClass();
    while(list($key, $val) = each($_POST)) {

        if(empty($val)) {
            $object->$key="null";
        } else {
            $object->$key="'".$mysqli->real_escape_string($val)."'";
        }
    }
    echo json_encode(createBook($object));
}

?>