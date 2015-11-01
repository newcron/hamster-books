alter table book modify column read_state enum('READ','UNREAD', 'CURRENT') DEFAULT 'UNREAD';
update book set read_state="CURRENT" where read_date = null;