<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;

class FindAllBooksQuery implements Query
{


    const QUERY = "select book.*, author.id as author__id, author.first_name as author__first_name, author.middle_name as author__middle_name,author.last_name as author__last_name " .
    "from book left join book_author on book.id=book_author.book_id left join author on book_author.author_id = author.id";


    public function getPreparedStatement()
    {
        return static::QUERY;
    }

    public function getParameters()
    {
        return [];
    }
}
