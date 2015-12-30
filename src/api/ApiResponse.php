<?php


namespace hamstersbooks\api;


use Flight;

class ApiResponse
{
    private $statusCode = 200;
    private $content;

    /**
     * @param mixed $statusCode
     * @return ApiResponse
     */
    public function withStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * @return ApiResponse
     */
    public function withContent($content)
    {
        $this->content = $content;

        return $this;
    }

    public function send() {

        if($this->content!==null) {
            Flight::json(DataFilter::fromInGetParameter()->filter($this->content), $this->statusCode);
        } else {
            Flight::halt($this->statusCode, null);
        }
    }

    public static function ok()
    {
        return new ApiResponse();
    }

    public static function created()
    {
        return (new ApiResponse())->withStatusCode(201);
    }




}