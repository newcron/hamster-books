<?php


namespace hamstersbooks\api\output;


use Flight;

class ApiResponse
{
    private $statusCode = 200;

    /** @var  Content */
    private $content;
    private $headers = [];


    private function __construct()
    {
        $this->content = new NoContent();
    }


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
    public function withJsonContent($content)
    {
        $this->content = new FilteredJsonContent($content,
            new CompoundFilter([DataFilter::fromInGetParameter(), new NullValuesFilter()]));

        return $this->withHeader("Content-Type", "application/json");
    }

    /** @return ApiResponse */
    public function withHeader($name, $value)
    {
        if($name === null || $value === null) {
            throw new \InvalidArgumentException("name and value must be set");
        }
        $this->headers[$name]=$value;
        return $this;
    }

    public function send()
    {
        $plainContent = $this->content->output();


        foreach ($this->headers as $name => $value) {
            header("$name: $value");
        }

        Flight::halt($this->statusCode, $plainContent?:"");
    }

    public static function ok()
    {
        return new ApiResponse();
    }

    public static function created()
    {
        return (new ApiResponse())->withStatusCode(201);
    }

    public static function found($newUrl)
    {
        return (new ApiResponse())->withStatusCode(301)->withHeader("Location", $newUrl);
    }

    public static function forbidden()
    {
        return (new ApiResponse())->withStatusCode(403);
    }

    public static function unauthorized()
    {
        return (new ApiResponse())->withStatusCode(401);
    }

    public function withHtmlContent($content)
    {
        $this->content = new StringContent($content);
        return $this->withHeader("Content-Type", "text/html");
    }


}