<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Supervisor extends CI_Controller
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
    redirect('supervisor/manageShipReceivable');
  }

  public function manageShipReceivable()
  {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth/logout');
    $data['title'] = 'Kelola Data Piutang Kapal';
    $data['profile'] = $this->m_utils->getProfile();
    $data['menu'] = $this->m_utils->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('supervisor/manageShipReceivable');
    $this->load->view('template/footer');
  }
}
