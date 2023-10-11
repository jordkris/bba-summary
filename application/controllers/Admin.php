<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }
  public function index($session)
  {
    $data['title'] = 'Manage Users';
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageUsers');
    $this->load->view('template/footer');
  }
}
