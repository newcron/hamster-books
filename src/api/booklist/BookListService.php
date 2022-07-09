<?php

namespace hamstersbooks\api\booklist;

use hamstersbooks\util\persistence\QueryExecutor;

class BookListService
{

    private QueryExecutor $executor;

    public function __construct()
    {
        $this->executor = QueryExecutor::usingExistingConnection();
    }

    public function getSelectedList(): BookList
    {
        if (!isset($_GET["bookListId"])) {
            throw new \Exception("book list id param not set");
        }
        $id = $_GET["bookListId"];
        return new BookList($id, "", false);
    }


    /**
     * @return BookList[]
     * @throws \Exception
     */
    public function getAllLists(): array
    {
        $result = $this->executor->fetchAll(new FindAllListsQuery());
        return array_map(fn($item) => new BookList($item->id, $item->name, $item->default_list == 1), $result);
    }

}
