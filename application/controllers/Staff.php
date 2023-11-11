<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Staff extends CI_Controller
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
    redirect('staff/manageShipData');
  }

  public function manageShipData()
  {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth/logout');
    $this->data['title'] = 'Kelola Data Kapal';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('staff/manageShipData');
    $this->load->view('template/footer');
  }
}
