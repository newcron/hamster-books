 create table book_author(
    id bigint unsigned not null auto_increment, 
    book_id int(10) unsigned not null, 
    author_id int(10) unsigned not null, 
    primary key(id), 
    FOREIGN KEY (author_id) REFERENCES author (id),
    FOREIGN KEY (book_id) REFERENCES book (id)
 ); 


 insert into book_author (book_id, author_id) select id, author_id from book;

 alter table book drop foreign key `book_ibfk_1`; 
 alter table book drop column author_id; 