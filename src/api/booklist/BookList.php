<?php

namespace hamstersbooks\api\booklist;

class BookList implements \JsonSerializable
{
    private int $id;

    private string $name;

    private bool $defaultList;

    /**
     * @param int $id
     * @param string $name
     */
    public function __construct(int $id, string $name, bool $defaultList)
    {
        $this->id = $id;
        $this->name = $name;
        $this->defaultList = $defaultList;
    }


    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return bool
     */
    public function isDefaultList(): bool
    {
        return $this->defaultList;
    }

    public function jsonSerialize()
    {

        return [
            "id" => $this->getId(),
            "name" => $this->getName(),
            "defaultList" => $this->isDefaultList()
        ];

    }

    public static function jsonDeserialize(array $arr): BookList
    {
        return new BookList(
            $arr["id"],
            $arr["name"],
            $arr["defaultList"]);
    }
}
