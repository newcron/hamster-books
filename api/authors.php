<?php
    function listAllAuthorsController() {
        echo json_encode(listAuthors());
    }

    function saveAuthorController() {
        echo json_encode(createAuthor(createDataObjectFromPost()));

    }
?>