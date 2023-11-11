<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Target extends CI_Controller
{
  private $webSession;
  public $data;

  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_auth', 'm_utils']);
    $this->webSession = $this->session->userdata('session');
    $this->data['profile'] = $this->m_utils->getProfile();
    $this->data['menu'] = $this->m_utils->getAccessMenu();
  }
  public function index()
  {
    redirect('target/manageTarget');
  }

  public function manageTarget()
  {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth/logout');
    $this->data['title'] = 'Kelola Data Target Bulan '.date('F Y');
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('target/manageTarget');
    $this->load->view('template/footer');
  }
}
