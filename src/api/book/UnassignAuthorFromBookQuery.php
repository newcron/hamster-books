<?php

namespace hamstersbooks\api\book;

use hamstersbooks\util\persistence\Query;

class UnassignAuthorFromBookQuery implements Query
{
    private $bookId;

    public function __construct(int $bookId)
    {
        $this->bookId = $bookId;
    }

    public function getPreparedStatement()
    {
        return "delete from book_author where book_id=?";
    }

    public function getParameters()
    {
        return [$this->bookId];
    }
}
