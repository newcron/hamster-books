<?php

namespace hamstersbooks\api\booklist;

use hamstersbooks\util\persistence\Query;

class FindAllListsQuery implements Query
{

    public function getPreparedStatement()
    {
        return "select * from list";
    }

    public function getParameters()
    {
        return [];
    }
}
