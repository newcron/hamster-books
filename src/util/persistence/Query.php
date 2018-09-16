<?php


namespace hamstersbooks\util\persistence;


interface Query
{

    public function getPreparedStatement();

    public function getParameters();


}