<?php


namespace hamstersbooks\util\persistence;


class BookAuthorEtagQuery implements Query
{

    public function getPreparedStatement()
    {
        return "select count(id) as etag from modification_log";
    }

    public function getParameters()
    {
        return [];
    }
}