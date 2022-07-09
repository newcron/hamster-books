create table list
(
    id           bigint unsigned not null auto_increment primary key,
    name         varchar(255),
    default_list bit(1)          not null default 0
);

insert into list(id, name, default_list)
values (1, "Bücher", 1),
       (2, "Comics", 0),
       (3, "Fachbücher", 0);

alter table book
    add column list_id bigint unsigned;

update book
set list_id=1;

alter table book
    change column list_id list_id bigint unsigned not null,
    add foreign key (list_id) references list (id);


