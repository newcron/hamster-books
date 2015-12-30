<?php
require_once "../constants.php";

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);
$mysqli->set_charset("utf8");

function listBooks($state = "UNREAD") {
    return listObjects("select book.*, author.first_name, author.middle_name, author.last_name  from book left join author on book.author_id = author.id where book.read_state='$state'");
}

function getBook($id) {
    return getObject("select book.*, author.first_name, author.middle_name, author.last_name from book left join author on book.author_id = author.id where book.id='$id'");
}


function listAuthors() {
    return listObjects("select * from author");
}

function createAuthor($contents) {
    execute("insert into author(added_date, modified_date, first_name, middle_name, last_name) values(now(), now(), $contents->first_name, $contents->middle_name, $contents->last_name)");
    return listObjects("select * from author order by id desc limit 1")[0];
}

function createBook($contents) {
    return execute("insert into book(
            added_date,
            modified_date,
            isbn,
            title,
            publisher,
            author_id,
            page_count,
            language,
            publication_year,
            read_date,
            read_comment,
            read_rating,
            read_state
        ) values(
            now(),
            now(),
            $contents->isbn,
            $contents->title,
            $contents->publisher,
            $contents->author_id,
            $contents->page_count,
            'DE',
            $contents->publication_year,
            $contents->read_date,
            $contents->read_comment,
            $contents->read_rating,
            $contents->read_state
        );");
}

function updateBook($contents) {
    $sql = "update book set
        modified_date = now(),
        isbn = $contents->isbn,
        title = $contents->title,
        publisher = $contents->publisher,
        author_id = $contents->author_id,
        page_count = $contents->page_count,
        language = 'DE',
        publication_year = $contents->publication_year,
        read_date = $contents->read_date,
        read_comment = $contents->read_comment,
        read_rating = $contents->read_rating,
        read_state = $contents->read_state
        where id = $contents->id;";
    return execute($sql);
}

/*
 *
+-------------------+-----------------------+------+-----+---------+----------------+
| Field             | Type                  | Null | Key | Default | Extra          |
+-------------------+-----------------------+------+-----+---------+----------------+
| id                | int(10) unsigned      | NO   | PRI | NULL    | auto_increment |
| added_date        | datetime              | YES  |     | NULL    |                |
| modified_date     | datetime              | YES  |     | NULL    |                |
| isbn              | char(13)              | YES  |     | NULL    |                |
| title             | varchar(255)          | YES  |     | NULL    |                |
| publisher         | varchar(255)          | YES  |     | NULL    |                |
| author_id         | int(10) unsigned      | NO   | MUL | NULL    |                |
| page_count        | int(10) unsigned      | YES  |     | NULL    |                |
| language          | char(2)               | YES  |     | DE      |                |
| publication_year  | int(10) unsigned      | YES  |     | NULL    |                |
| read_date         | datetime              | YES  |     | NULL    |                |
| read_date_guessed | bit(1)                | YES  |     | b'0'    |                |
| read_comment      | text                  | YES  |     | NULL    |                |
| read_rating       | decimal(10,2)         | YES  |     | NULL    |                |
| read_state        | enum('READ','UNREAD') | YES  | MUL | UNREAD  |                |
| tags              | text                  | YES  |     | NULL    |                |
+-------------------+-----------------------+------+-----+---------+----------------+
 */

function createDataObjectFromPost() {
    global $mysqli;
    $object = new stdClass();
    while(list($key, $val) = each($_POST)) {

        if(empty($val)) {
            $object->$key="null";
        } else {
            $object->$key="'".$mysqli->real_escape_string($val)."'";
        }
    }

    return $object;
}

function execute($query) {
    global $mysqli;
    $queryResult = $mysqli->query($query);
    if(!$queryResult) {
        throw new Exception($mysqli->error);
    }
    return array("success" => true, "query" => $query);

}

function listObjects($selectQuery) {
    global $mysqli;
    $queryResult = $mysqli->query($selectQuery);
    if(!$queryResult) {
        throw new Exception($mysqli->error);
    }
    $result = array();
    while($item = $queryResult->fetch_object()) {
        $result[] = $item;
    }
    return $result;
}

function getObject($selectQuery) {
    global $mysqli;
    $queryResult = $mysqli->query($selectQuery);
    if(!$queryResult) {
        throw new Exception($mysqli->error);
    }
    return $queryResult->fetch_object();
}

?>