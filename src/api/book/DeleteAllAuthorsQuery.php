<?php

namespace hamstersbooks\api\book;

use hamstersbooks\util\persistence\Query;

class DeleteAllAuthorsQuery implements Query
{
    private $id;

    public function __construct(int $id)
    {
        $this->id = $id;
    }

    public function getPreparedStatement()
    {
        return "delete from book_author where book_id=?";
    }

    public function getParameters()
    {
        return [$this->id];
    }
}
