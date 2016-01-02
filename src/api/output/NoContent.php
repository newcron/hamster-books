<?php


namespace hamstersbooks\api\output;


class NoContent implements Content
{

    public function output()
    {
        return null;
    }
}