<?php

namespace hamstersbooks\api\book;

use hamstersbooks\util\persistence\Query;

class DeleteBookByIdQuery implements Query
{
    private $id;

    public function __construct(int $id)
    {
        $this->id = $id;
    }

    public function getPreparedStatement()
    {
        return "delete from book where id=?";
    }

    public function getParameters()
    {
        return [$this->id];
    }
}
