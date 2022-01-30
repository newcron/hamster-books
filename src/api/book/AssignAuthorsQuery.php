<?php

namespace hamstersbooks\api\book;

use hamstersbooks\util\persistence\Query;

class AssignAuthorsQuery implements Query
{
    /**
     * @var int|mixed
     */
    private $id;
    /**
     * @var int[]
     */
    private $authorIdsToAssign;

    /**
     * @param mixed $id
     * @param array $authorIdsToAssign
     */
    public function __construct(int $id, int ...$authorIdsToAssign)
    {
        $this->id = $id;
        $this->authorIdsToAssign = $authorIdsToAssign;
    }

    public function getPreparedStatement()
    {
        $dynamicParams = implode(",", array_map(fn($x) => "(?, ?)", $this->authorIdsToAssign));

        return "insert into book_author(book_id, author_id) values $dynamicParams";
    }

    public function getParameters()
    {
        $params = [];
        foreach ($this->authorIdsToAssign as $authorId) {
            $params[] = $this->id;
            $params[] = $authorId;
        }
        return $params;
    }
}
