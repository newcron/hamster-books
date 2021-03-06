<?php


namespace hamstersbooks\api\book;


use AmazonECS;
use hamstersbooks\api\output\ApiResponse;

class SearchBookOnAmazonController
{
    public function __invoke(\AmazonECS $amazonECS, $isbn)
    {
        $amazonEcs = new AmazonECS(AWS_PUBLIC_KEY, AWS_SECRET_KEY, "DE", AWS_ASSOCIATE_TAG);
        $lookup = $amazonEcs
          ->optionalParameters(["IdType", "ISBN"])
          ->category("Books")
          ->responseGroup("Large")
          ->returnType(AmazonECS::RETURN_TYPE_ARRAY)
          ->search($isbn);
        $result = $lookup["Items"]["Item"][0];
        ApiResponse::ok()->withJsonContent($result)->send();
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
