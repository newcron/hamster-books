<?php


namespace hamstersbooks\api\output;


class StringContent implements Content
{
    private $content;

    public function __construct($content)
    {
        $this->content = $content;
    }

    /** @return mixed returns content for the output. if <code>null</code> is returned, then output is empty */
    public function output()
    {
        return $this->content;
    }
}