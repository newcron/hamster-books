<?php


namespace hamstersbooks\util\persistence;


use hamstersbooks\api\DatabaseConnectionFactory;

class QueryExecutor
{
    /** @var  \PDO */
    private $pdo;

    private $inTransaction = false;

    /**
     * QueryExecutor constructor.
     * @param \PDO $pdo
     */
    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function fetchUnique(Query $query)
    {
        $results = $this->fetchAll($query);
        if (sizeof($results) !== 1) {
            throw new \Exception("Expected Query '" . $this->printableQuery($query) . "' to return one result, but it returned " . sizeof($results));
        }
        return reset($results);
    }

    public function execute(Query $query)
    {
        $this->executeAll($query);
    }


    public function executeAll(Query ...$queries)
    {
        $manageTransactionImplicitly = $this->inTransaction == false;
        if ($manageTransactionImplicitly) {
            $this->beginTransaction();
        }
        try {
            foreach ($queries as $query) {
                $this->fetchAll($query);
            }
            if ($manageTransactionImplicitly) {
                $this->commitTransaction();
            }

        } catch (\Exception $e) {
            if ($manageTransactionImplicitly) {
                $this->rollbackTransaction();
            }
            throw $e;
        }
    }

    public function fetchAll(Query $query)
    {
        $statement = $this->pdo->prepare($query->getPreparedStatement());
        try {
            $success = $statement->execute($query->getParameters());
            if ($success === false) {
                throw new \Exception("Executing Query '" . $this->printableQuery($query) . "' failed: " . implode(", ",
                        $statement->errorInfo()));
            }

            return $statement->fetchAll(\PDO::FETCH_CLASS);
        } finally {
            $statement->closeCursor();
        }
    }

    public static function usingExistingConnection()
    {
        return new QueryExecutor(DatabaseConnectionFactory::retrieveDatabase());
    }

    /**
     * @param Query $query
     * @return mixed
     */
    private function printableQuery(Query $query)
    {
        return preg_replace("/\\s+/", " ", $query->getPreparedStatement());
    }

    /**
     * @return void
     * @throws \Exception
     */
    public function beginTransaction(): void
    {

        if (!$this->pdo->beginTransaction()) {
            throw new \Exception("can't initialize transaction");
        }
        $this->inTransaction = true;
    }

    /**
     * @return void
     */
    public function rollbackTransaction(): void
    {
        $this->pdo->rollBack();
        $this->inTransaction = false;
    }

    /**
     * @return void
     * @throws \Exception
     */
    public function commitTransaction(): void
    {
        $this->inTransaction = false;
        if (!$this->pdo->commit()) {
            throw new \Exception("Commit failed");
        }
    }


}
