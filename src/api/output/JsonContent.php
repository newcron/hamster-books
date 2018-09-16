<?php


namespace hamstersbooks\api\output;


class JsonContent implements Content
{
    /** @var  mixed */
    private $jsonObjectStructure;

    public function __construct($jsonObjectStructure)
    {
        if ($jsonObjectStructure === null) {
            throw new \InvalidArgumentException("null json payload not allowed");
        }
        $this->jsonObjectStructure = $jsonObjectStructure;
    }


    /** called to echo the content body */
    public function output()
    {
        return json_encode($this->jsonObjectStructure);
    }
}