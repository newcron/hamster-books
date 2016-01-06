<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;
use hamstersbooks\util\Strings;

class UpdateBookQuery implements Query
{

    const FORM_PARAMS_IN_CORRECT_ORDER = [
        "isbn",
        "title",
        "publisher",
        "author_id",
        "page_count",
        "publication_year",
        "read_date_end",
        "read_comment",
        "read_rating",
        "read_state",
        "id"
    ];


    /** @var  array */
    private $formParams = [];

    /**
     * UpdateBookQuery constructor.
     * @param array $formParams
     */
    public function __construct(array $formParams)
    {
        if(!isset($formParams["id"])) {
            throw new \Exception("id field mandatory for updating a book");
        }
        foreach (static::FORM_PARAMS_IN_CORRECT_ORDER as $key) {
            $value = isset($formParams[$key]) ? Strings::emptyToNull($formParams[$key]) : null;

            $this->formParams[] = $value;
        }
    }


    public function getPreparedStatement()
    {
        return "update book set
            modified_date = now(),
            isbn = ?,
            title = ?,
            publisher = ?,
            author_id = ?,
            page_count = ?,
            language = 'DE',
            publication_year = ?,
            read_date_end = ?,
            read_comment = ?,
            read_rating = ?,
            read_state = ?
            where id = ?;";


    }

    public function getParameters()
    {
        return $this->formParams;
    }
}