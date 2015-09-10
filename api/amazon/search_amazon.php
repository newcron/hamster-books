<?php

function searchBook($isbn)
{

    require "AmazonECS.class.php";

    header("Content-Type: application/json");
    $amazonEcs = new AmazonECS(AWS_PUBLIC_KEY, AWS_SECRET_KEY, "DE", AWS_ASSOCIATE_TAG);
    $result = $amazonEcs->responseGroup("Large")->returnType(AmazonECS::RETURN_TYPE_ARRAY)->lookup($isbn)["Items"]["Item"];


    $filterFunction = isset($_GET["in"]) ? function ($key) {
        return array_search($key, $_GET["in"]) !== false;
    } : function ($key) {
        return true;
    };

    echo json_encode(array_filter($result, $filterFunction, ARRAY_FILTER_USE_KEY));
}
