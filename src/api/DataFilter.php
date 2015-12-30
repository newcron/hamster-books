<?php


namespace hamstersbooks\api;


class DataFilter
{

    private $allowedJsonRootElements = [];

    public function __construct(array $allowedJsonRootElements)
    {
        $this->allowedJsonRootElements = $allowedJsonRootElements;
    }

    public function filter($jsonResponse)
    {
        if (empty($this->allowedJsonRootElements)) {
            return $jsonResponse;
        }

        if ($this->isJsonArrayStructure($jsonResponse)) {
            return array_map([$this, "filterElement"], $jsonResponse);
        }

        return $this->filterElement($jsonResponse);

    }

    private function isJsonArrayStructure(array $array)
    {
        return empty(array_filter(array_keys($array), 'is_string'));
    }

    public static function fromInGetParameter()
    {
        return new DataFilter(isset($_GET["in"]) ? $_GET["in"] : []);
    }

    /**
     * @return array
     */
    private function filterElement($jsonResponse)
    {
        $filteredResult = [];
        foreach ((array)$jsonResponse as $key => $value) {
            if (array_search($key, $this->allowedJsonRootElements) !== false) {
                $filteredResult[$key] = $value;
            }
        }

        return $filteredResult;
    }
}