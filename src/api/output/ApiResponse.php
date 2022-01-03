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

        return $this->withHeader("Content-Type", "application/json;charset=utf8");
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

        

        if($this->statusCode===200) {
            
            $etagValue="\"".md5($plainContent)."\"";
            $passedEtagValue = empty($_SERVER["HTTP_IF_NONE_MATCH"]) ? "": $_SERVER["HTTP_IF_NONE_MATCH"];
 

            header_remove("Pragma");
            header('Cache-Control: "max-age=3600, must-revalidate"');
            header("ETag: $etagValue");

            

            if($etagValue === $passedEtagValue) {
              flight::halt(304, "");
              return;
            }
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

    public static function notFound()
    {
        return (new ApiResponse())->withStatusCode(404);
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

    public static function internalServerError()
    {
        return (new ApiResponse())->withStatusCode(500);
    }




    public static function notModified()
    {
        header_remove("Cache-Control");
        header_remove("Expires");
        return (new ApiResponse())->withStatusCode(304);

    }


    public function withHtmlContent($content)
    {
        $this->content = new StringContent($content);
        return $this->withHeader("Content-Type", "text/html;charset=utf8");
    }


}
