<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;

class FindBooksByStateQuery implements Query
{

    const QUERY = "select book.*, author.first_name, author.middle_name, author.last_name from book left join author on book.author_id = author.id  where book.read_state=?";

    private $state;

    /**
     * BrowseBookByStateQuery constructor.
     * @param $state
     */
    public function __construct($state)
    {
        if (!in_array($state, ["READ", "UNREAD"])) {
            throw new \InvalidArgumentException("Only Read and Unread states supported");
        }

        $this->state = $state;
    }


    public function getPreparedStatement()
    {
        return static::QUERY;
    }

    public function getParameters()
    {
        return [$this->state];
    }
}