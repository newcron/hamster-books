<?php


namespace hamstersbooks\api\author;


use hamstersbooks\util\persistence\Query;

class GetAuthorsBibliographyQuery implements Query
{

    private $params;

    public function __construct(array $authorIds) {
        $this->params = $authorIds;
    }

    public function getPreparedStatement()
    {
        
        $dynamicParams = implode(",", array_map(fn($x)=>"?", $this->params));
        return "select book_author.author_id as author__id, book.* from book_author left join book on book_author.book_id = book.id where author_id in ($dynamicParams)";
    }

    public function getParameters()
    {
        return $this->params;
    }
}