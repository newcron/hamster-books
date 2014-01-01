drop table if exists book;
drop table if exists author;


create table author(
    id int unsigned not null auto_increment primary key,
    added_date datetime,
    modified_date datetime,
    first_name varchar(255),
    middle_name varchar(255),
    last_name varchar(255)
) engine=INNODB;

create table book(
    id int unsigned not null auto_increment primary key,
    added_date datetime,
    modified_date datetime,
    isbn char(13) default null,
    title varchar(255),
    publisher varchar(255),
    author_id int unsigned not null,
    page_count int unsigned default null,
    language char(2) default "DE",
    publication_year int unsigned default null,
    read_date datetime default null,
    read_date_guessed bit(1) default 0,
    read_comment text,
    read_rating decimal(10,2),
    read_state enum("READ", "UNREAD") default "UNREAD",
    tags text,
    key (read_state),
    foreign key  (author_id) references author(id)
) engine=INNODB;




insert into author(added_date, modified_date, first_name, middle_name, last_name) values
    (now(), now(), "John", "R.R.", "Tolkien"),
    (now(), now(), "Harald", null, "Evers");



insert into book(added_date, modified_date, isbn, title, publisher, author_id, page_count, language, publication_year, read_date, read_comment, read_rating, read_state) values
    (now(), now(), "9783608939828", "Der Herr der Ringe - Die zwei Türme", "Klett-Kotta", 1, 512, "DE", 2013, null, null, null,"UNREAD"),
    (now(), now(), "9783608939811", "Der Herr der Ringe - Die Gefährten", "Klett-Kotta", 1, 608, "DE", 2013, null, null, null,"UNREAD"),
    (now(), now(), "9783608939835", "Der Herr der Ringe - Die Rückkehr des Königs", "Klett-Kotta", 1, 444, "DE", 2013, null, null, null,"UNREAD"),
    (now(), now(), "9783453178977", "Höhlenwelt-Saga, Bd. 1: Die Bruderschaft von Yoor", "Heyne", 2, 854, "DE", 204, now(), "suuuuper toolles buch! gefällt mir sehr gut", 5,"READ");