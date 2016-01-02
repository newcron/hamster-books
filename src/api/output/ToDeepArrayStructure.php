<?php


namespace hamstersbooks\api\output;


class ToDeepArrayStructure
{
    public function convert($data)
    {
        return $this->stdclassObjectsToArrays($data);
    }

    private function stdClassObjectsToArrays($element)
    {
        if ($element instanceof \stdClass) {
            $element = (array)$element;
        }
        if (is_array($element)) {
            foreach ($element as $key => $value) {
                $element[$key] = $this->stdclassObjectsToArrays($value);
            }
        }

        return $element;
    }
}