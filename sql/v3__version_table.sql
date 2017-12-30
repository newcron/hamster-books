create table modification_log(
    id int unsigned not null auto_increment primary key,
    entity varchar(50),
    date datetime
) engine=INNODB;

insert into modification_log(entity, date) values("INITIAL", now());