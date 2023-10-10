<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ApiResponse
{
    public $status;
    public $message;
    public $messageDetail;
    public $output;

    public function __construct($status = null, $message = null, $messageDetail = null, $output = null)
    {
        $this->status = $status;
        $this->message = $message;
        $this->messageDetail = $messageDetail;
        $this->output = $output;
    }

    public function toJson()
    {
        return json_encode($this);
    }
}
