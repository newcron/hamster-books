<?php


namespace hamstersbooks\api\book;


use hamstersbooks\util\persistence\Query;

class UpdateBookQuery implements Query
{

    /** @var  array */
    private $formParams = [];

    /**
     * UpdateBookQuery constructor.
     * @param array $formParams
     */
    public function __construct($id, $isbn, $title, $publisher, $pageCount, $publicationYear, $readDateStart, $readDateEnd, $readComment, $readRating, $readState, $tags, $cancelledOnPage)
    {
        if (empty($id)) {
            throw new \Exception("id field mandatory for updating a book");
        }
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
            $cancelledOnPage,
            $id];


    }


    public function getPreparedStatement()
    {
        return "update book set
            modified_date = now(),
            language = 'DE',
            isbn = ?,
            title = ?,
            publisher = ?,
            page_count = ?,
            publication_year = ?,
            read_date_start = ?,
            read_date_end = ?,
            read_comment = ?,
            read_rating = ?,
            read_state = ?,
            tags = ?, 
            read_canceled_page = ?
            where id = ?;";


    }

    public function getParameters()
    {
        return $this->formParams;
    }
}
