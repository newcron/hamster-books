<?php


namespace hamstersbooks\util\persistence;


class ModificationLoggingQuery implements Query
{

    public function getPreparedStatement()
    {
        return 'insert into modification_log(date) values(now())';
    }

    public function getParameters()
    {
        return [];
    }
}