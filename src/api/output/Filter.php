<?php
namespace hamstersbooks\api\output;

interface Filter
{
    /** @return array */
    public function filter(array $jsonResponse);
}