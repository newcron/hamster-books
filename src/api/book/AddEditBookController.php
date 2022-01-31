<?php


namespace hamstersbooks\api\book;


use hamstersbooks\api\output\ApiResponse;
use hamstersbooks\util\persistence\QueryExecutor;

class AddEditBookController
{
    public function __invoke(array $params, QueryExecutor $executor)
    {
        try {

            $executor->beginTransaction();

            $bookId = $this->isUpdate($params) ? $this->updateBook($executor, $params) : $this->createBook($executor, $params);
            $this->createAndAssignAuthors($params["authors"], $executor, $bookId);

            $executor->commitTransaction();
        } catch (\Exception $e) {
            $executor->rollbackTransaction();
            throw $e;
        }
        ApiResponse::created()->withJsonContent(["success" => true])->send();

    }


    /**
     * @param QueryExecutor $executor
     * @param array $params
     * @return void
     * @throws \Exception
     */
    public function updateBook(QueryExecutor $executor, array $params): int
    {
        $executor->execute(new UpdateBookQuery(
            $params["id"],
            $params["isbn"],
            $params["title"],
            $params["publisher"]["name"] ?? null,
            $params["pageCount"],
            $params["publicationYear"],
            $params["readNotes"]["startDate"] ?? null,
            $params["readNotes"]["finishDate"] ?? null,
            $params["readNotes"]["comment"] ?? null,
            $params["readNotes"]["rating"] ?? null,
            $params["readState"],
            $this->serializeTags($params["readNotes"]["tags"])
        ));
        return (int)$params["id"];
    }

    private function createBook(QueryExecutor $executor, array $params)
    {
        $executor->execute(new InsertBookQuery(
            $params["isbn"],
            $params["title"],
            $params["publisher"]["name"] ?? null,
            $params["pageCount"],
            $params["publicationYear"],
            $params["readNotes"]["startDate"] ?? null,
            $params["readNotes"]["finishDate"] ?? null,
            $params["readNotes"]["comment"] ?? null,
            $params["readNotes"]["rating"] ?? null,
            $params["readState"],
            $this->serializeTags($params["readNotes"]["tags"])
        ));

        return (int)($executor->fetchUnique(new FindLastInsertBookQuery())->id);


    }


    public static function handle()
    {
        return function () {
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            (new AddEditBookController())->__invoke($input, QueryExecutor::usingExistingConnection());
        };
    }

    /**
     * @param $authors
     * @param QueryExecutor $executor
     * @param int $bookId
     * @return void
     * @throws \Exception
     */
    public function createAndAssignAuthors($authors, QueryExecutor $executor, int $bookId): void
    {
        $authorIdsToAssign = [];
        foreach ($authors as $author) {
            if (isset($author["id"])) {
                $authorIdsToAssign[] = $author["id"];
            } else {
                $query = new InsertAuthorQuery($author["firstName"] ?? "", $author["middleName"] ?? "", $author["lastName"] ?? "");
                $executor->execute($query);
                $authorIdsToAssign[] = $executor->fetchUnique(new FindLastInsertAuthorQuery())->id;
            }
        }
        $executor->execute(new DeleteAllAuthorsQuery($bookId));
        if (!empty($authorIdsToAssign)) {
            $executor->execute(new AssignAuthorsQuery($bookId, ...$authorIdsToAssign));
        }
    }

    /**
     * @param array $params
     * @return bool
     */
    public function isUpdate(array $params): bool
    {
        return isset($params["id"]);
    }

    /**
     * @param $tags
     * @return string
     */
    public function serializeTags($tags): string
    {
        return implode(",", $tags ?? []);
    }
}
