<?php


namespace hamstersbooks\api\output;


class NullValuesFilter implements Filter
{

    /** @return array */
    public function filter(array $jsonResponse)
    {
        foreach ($jsonResponse as $key => $value) {
            if (is_array($value)) {
                $jsonResponse[$key] = $this->filter($value);
            } elseif ($value === null) {
                unset($jsonResponse[$key]);
            }
        }

        return $jsonResponse;
    }


}