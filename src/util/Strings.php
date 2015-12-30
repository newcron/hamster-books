<?php


namespace hamstersbooks\util;


final class Strings
{
    private function __construct()
    {
    }

    /** @return string */
    public static function emptyToNull($value) {
        return empty($value) ? null : $value;
    }

}