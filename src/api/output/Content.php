<?php


namespace hamstersbooks\api\output;


interface Content
{
    /** @return mixed returns content for the output. if <code>null</code> is returned, then output is empty */
    public function output();
}