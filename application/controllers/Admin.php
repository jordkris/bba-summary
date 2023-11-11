<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends CI_Controller
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
   redirect('admin/manageUsers'); 
  }

  public function manageUsers() {
    if (!$this->m_auth->checkSession($this->webSession, true)) redirect('auth/logout');
    $this->data['title'] = 'Kelola Users';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageUsers');
    $this->load->view('template/footer');
  }

  public function manageShipName() {
    $this->data['title'] = 'Kelola Nama Kapal';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageShipName');
    $this->load->view('template/footer');
  }

  public function manageShipType() {
    $this->data['title'] = 'Kelola Tipe Kapal';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageShipType');
    $this->load->view('template/footer');
  }
  public function manageShipOwner() {
    $this->data['title'] = 'Kelola Pemilik Kapal';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageShipOwner');
    $this->load->view('template/footer');
  }
  public function manageBranch() {
    $this->data['title'] = 'Kelola Cabang';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageBranch');
    $this->load->view('template/footer');
  }

  public function manageActivity() {
    $this->data['title'] = 'Kelola Kegiatan Agency / PBM';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageActivity');
    $this->load->view('template/footer');
  }

  public function manageTugActivity() {
    $this->data['title'] = 'Kelola Kegiatan Tug';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageTugActivity');
    $this->load->view('template/footer');
  }

  public function manageTugHarborLocation() {
    $this->data['title'] = 'Kelola Lokasi Pelabuhan Tug';
    $this->load->view('template/header', $this->data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageTugHarborLocation');
    $this->load->view('template/footer');
  }
}
