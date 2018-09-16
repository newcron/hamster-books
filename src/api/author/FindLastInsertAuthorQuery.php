<?php


namespace hamstersbooks\api\author;


use hamstersbooks\util\persistence\Query;

class FindLastInsertAuthorQuery implements Query
{

    public function getPreparedStatement()
    {
        return "select * from author order by id desc limit 1";
    }

    public function getParameters()
    {
        return [];
    }
}