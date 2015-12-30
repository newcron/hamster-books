<?php


namespace hamstersbooks\api\book;


use AmazonECS;
use hamstersbooks\api\ApiResponse;

class SearchBookOnAmazonController
{
    public function __invoke(\AmazonECS $amazonECS, $isbn)
    {
        $amazonEcs = new AmazonECS(AWS_PUBLIC_KEY, AWS_SECRET_KEY, "DE", AWS_ASSOCIATE_TAG);
        $result = $amazonEcs->responseGroup("Large")->returnType(AmazonECS::RETURN_TYPE_ARRAY)->lookup($isbn)["Items"]["Item"];


        ApiResponse::ok()->withContent($result)->send();
    }

    public static function handle()
    {
        return function ($isbn) {
            $amazonEcs = new \AmazonECS(
                AWS_PUBLIC_KEY,
                AWS_SECRET_KEY,
                "DE",
                AWS_ASSOCIATE_TAG);


            (new SearchBookOnAmazonController())->__invoke($amazonEcs, $isbn);
        };
    }
}