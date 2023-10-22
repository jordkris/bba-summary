<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends CI_Controller
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
   redirect('admin/manageUsers'); 
  }

  public function manageUsers() {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth');
    $data['title'] = 'Kelola Users';
    $data['profile'] = $this->m_utils->getProfile();
    $data['menu'] = $this->m_utils->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageUsers');
    $this->load->view('template/footer');
  }

  public function manageShipName() {
    $data['title'] = 'Kelola Nama Kapal';
    $data['profile'] = $this->getProfile();
    $data['menu'] = $this->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageShipName');
    $this->load->view('template/footer');
  }

  public function manageShipType() {
    $data['title'] = 'Kelola Tipe Kapal';
    $data['profile'] = $this->getProfile();
    $data['menu'] = $this->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageShipType');
    $this->load->view('template/footer');
  }
  public function manageShipOwner() {
    $data['title'] = 'Kelola Pemilik Kapal';
    $data['profile'] = $this->getProfile();
    $data['menu'] = $this->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageShipOwner');
    $this->load->view('template/footer');
  }
  public function manageBranch() {
    $data['title'] = 'Kelola Cabang';
    $data['profile'] = $this->getProfile();
    $data['menu'] = $this->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageBranch');
    $this->load->view('template/footer');
  }

  public function manageActivity() {
    $data['title'] = 'Kelola Kegiatan';
    $data['profile'] = $this->getProfile();
    $data['menu'] = $this->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageActivity');
    $this->load->view('template/footer');
  }
}
