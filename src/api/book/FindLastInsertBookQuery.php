<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;

class FindLastInsertBookQuery implements Query
{

    public function getPreparedStatement()
    {
        return "select * from book order by id desc limit 1";
    }

    public function getParameters()
    {
        return [];
    }
}
