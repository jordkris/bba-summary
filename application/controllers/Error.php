<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Error extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->error404();
  }
  public function error404() {
    $this->load->view('errors/404Error');
  }

  public function error403() {
    $this->load->view('errors/403Error');
  }
}
