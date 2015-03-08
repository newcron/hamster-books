<?php

function searchBook($isbn) {

    header("Content-Type: application/json");

    $items = json_decode(file_get_contents("https://www.googleapis.com/books/v1/volumes?q=isbn:$isbn"));

    if($items->totalItems > 0) {
        $volumeId = $items->items[0]->id;
        echo file_get_contents("https://www.googleapis.com/books/v1/volumes/$volumeId");
    } else {
        http_response_code(404);
    }
}
?>