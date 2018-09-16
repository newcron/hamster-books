#!/bin/bash -e

IP_ADDR=`/usr/local/bin/docker-machine ip $DOCKER_MACHINE_NAME`;

docker-compose up -d

mysql -uroot -ppassword -h$IP_ADDR -P3306 hamstersbooks < ../sql/init.sql;
for i in `ls ../sql/v*`; do
    echo "installing $i";
    mysql -uroot -ppassword -h$IP_ADDR -P3306 hamstersbooks < $i;
done
