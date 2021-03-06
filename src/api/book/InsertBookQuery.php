<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;
use hamstersbooks\util\Strings;

class InsertBookQuery implements Query
{

    const FORM_PARAMS_IN_CORRECT_ORDER = [
        "isbn",
        "title",
        "publisher",
        "author_id",
        "page_count",
        "publication_year",
        "read_date_start",
        "read_date_end",
        "read_comment",
        "read_rating",
        "read_state",
        "tags"
    ];


    /** @var  array */
    private $formParams = [];

    /**
     * InsertBookQuery constructor.
     * @param array $formParams
     */
    public function __construct(array $formParams)
    {
        foreach (static::FORM_PARAMS_IN_CORRECT_ORDER as $key) {
            $value = isset($formParams[$key]) ? Strings::emptyToNull($formParams[$key]) : null;

            $this->formParams[] = $value;
        }
    }


    public function getPreparedStatement()
    {
        return "insert into book(
            added_date,
            modified_date,
            language,
            isbn,
            title,
            publisher,
            author_id,
            page_count,
            publication_year,
            read_date_start,
            read_date_end,
            read_comment,
            read_rating,
            read_state,
            tags
        ) values (
            now(), now(), 'DE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    }

    public function getParameters()
    {
        return $this->formParams;
    }
}