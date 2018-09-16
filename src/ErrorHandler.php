<?php


namespace hamstersbooks;


class ErrorHandler
{
    public function handle(\Exception $e)
    {
        echo json_encode($this->generateException($e));
        http_response_code(500);

    }

    /**
     * @param \Exception $e
     * @return array
     */
    private function generateException(\Exception $e)
    {
        $details = [
            'error' => array(
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
                'stacktrace' => explode("\n", $e->getTraceAsString())
            )
        ];

        if($e->getPrevious()!==null) {
            $details["cause"] = $this->generateException($e->getPrevious());
        }

        return $details;
    }
}