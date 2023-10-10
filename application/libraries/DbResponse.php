<?php
defined('BASEPATH') or exit('No direct script access allowed');

class DbResponse
{
    public $output;
    public $error;

    public function __construct($output = null, $error = null)
    {
        $this->output = $output;
        $this->error = $error;
    }

}
