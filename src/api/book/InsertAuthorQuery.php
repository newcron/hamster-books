<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;

class InsertAuthorQuery implements Query
{

    private $params;

    public function __construct($firstName, $middleName, $lastName)
    {


        if ($firstName === null && $lastName === null) {
            throw new \InvalidArgumentException("First or Last name must be provided");
        }

        $this->params = [$firstName, $middleName, $lastName];
    }

    public function getPreparedStatement()
    {
        return "insert into author(
                added_date, modified_date, first_name, middle_name, last_name
            ) values(now(), now(), ?, ?, ?)";
    }

    public function getParameters()
    {
        return $this->params;
    }
}
