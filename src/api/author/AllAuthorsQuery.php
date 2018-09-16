<?php


namespace hamstersbooks\api\author;


use hamstersbooks\util\persistence\Query;

class AllAuthorsQuery implements Query
{

    public function getPreparedStatement()
    {
        return "select * from author";
    }

    public function getParameters()
    {
        return [];
    }
}