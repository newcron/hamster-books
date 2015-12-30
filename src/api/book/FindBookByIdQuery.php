<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;

class FindBookByIdQuery implements Query
{

    const QUERY = "select book.*, author.first_name, author.middle_name, author.last_name from book left join author on book.author_id = author.id  where book.id=?";

    private $id;

    /**
     * GetBookByIdQuery constructor.
     * @param $id
     */
    public function __construct($id)
    {
        $this->id = $id;
    }


    public function getPreparedStatement()
    {
        return static::QUERY;
    }

    public function getParameters()
    {
        return [$this->id];
    }
}