<?php


namespace hamstersbooks\api\book;


class Etag
{
    private $value;

    /**
     * Etag constructor.
     * @param $value
     */
    private function __construct($value)
    {
        $this->value = $value;
    }

    public function equals($othercode) {
        if($this->value === null) {
            return false;
        }

        return trim($this->value, '"\'"') === trim($othercode, '"\'"');
    }

    static function fromServerArray()
    {
        return new Etag(
            isset($_SERVER["HTTP_IF_NONE_MATCH"]) ?
                $_SERVER['HTTP_IF_NONE_MATCH'] : null
        );
    }
}