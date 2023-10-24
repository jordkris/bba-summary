<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Tug extends CI_Controller
{
  private $webSession;
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_auth', 'm_utils']);
    $this->webSession = $this->session->userdata('session');
  }
  public function index()
  {
    redirect('tug/manageTugData');
  }

  public function manageTugData()
  {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth/logout');
    $data['title'] = 'Kelola Data Tug';
    $data['profile'] = $this->m_utils->getProfile();
    $data['menu'] = $this->m_utils->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('tug/manageTugData');
    $this->load->view('template/footer');
  }
}
