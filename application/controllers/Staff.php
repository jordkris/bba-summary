<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Staff extends CI_Controller
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
    redirect('staff/manageShipData');
  }

  public function manageShipData()
  {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth/logout');
    $data['title'] = 'Kelola Data Kapal';
    $data['profile'] = $this->m_utils->getProfile();
    $data['menu'] = $this->m_utils->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('staff/manageShipData');
    $this->load->view('template/footer');
  }
}
