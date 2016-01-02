<?php


namespace hamstersbooks\api\output;


class FilteredJsonContent implements Content
{

    private $jsonContent;

    public function __construct($jsonContent, Filter $filter)
    {
        if($filter === null) {
            throw new \InvalidArgumentException("Filter Mandatory");
        }

        $toArrayConverter = new ToDeepArrayStructure();
        $this->jsonContent = new JsonContent($filter->filter($toArrayConverter->convert($jsonContent)));
    }


    public function output()
    {
        return $this->jsonContent->output();
    }
}