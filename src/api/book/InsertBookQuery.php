<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\booklist\BookList;
use hamstersbooks\util\persistence\Query;

class InsertBookQuery implements Query
{
    private $formParams;

    public function __construct($isbn, $title, $publisher, $pageCount, $publicationYear, $readDateStart, $readDateEnd, $readComment, $readRating, $readState, $tags, $readCancelledPage, BookList $list)
    {
        $this->formParams = [
            $isbn,
            $title,
            $publisher,
            $pageCount,
            $publicationYear,
            $readDateStart,
            $readDateEnd,
            $readComment,
            $readRating,
            $readState,
            $tags,
            $readCancelledPage,
            $list->getId()
        ];
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
            page_count,
            publication_year,
            read_date_start,
            read_date_end,
            read_comment,
            read_rating,
            read_state,
            tags, 
            read_canceled_page, 
            list_id
        ) values (
            now(), now(), 'DE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    }

    public function getParameters()
    {
        return $this->formParams;
    }
}
