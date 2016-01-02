<?php


namespace hamstersbooks\api\output;


class CompoundFilter implements Filter
{

    /** @var  Filter[] */
    private $filters;

    /**
     * CompoundFilter constructor.
     * @param Filter[] $filters
     */
    public function __construct(array $filters)
    {
        $this->filters = $filters;
    }


    /** @return array */
    public function filter(array $jsonResponse)
    {
        foreach ($this->filters as $filter) {
            $jsonResponse = $filter->filter($jsonResponse);
        }
        return $jsonResponse;
    }
}