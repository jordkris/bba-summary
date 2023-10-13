<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Supervisor extends CI_Controller
{
  private $webSession;
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_auth', 'm_db']);
    $this->webSession = $this->session->userdata('session');
    if (!$this->m_auth->checkSession($this->webSession)) redirect('auth');
  }

  private function getRoleName($roleId)
  {
    $dbResponse = $this->m_db->selectById('role', $roleId);
    if ($dbResponse->error['code']) throw new Exception($dbResponse->error['message']);
    return $dbResponse->output->row_array()['name'];
  }
  private function getProfile()
  {
    return [
      'username' => $this->session->userdata('username'),
      'role' => $this->getRoleName($this->session->userdata('roleId')),
      'session' => $this->session->userdata('session')
    ];
  }

  private function getAccessMenu() {
    return $this->db->query('
      SELECT m.name, m.path, m.icon 
      FROM accessmenu am 
      JOIN menu m ON am.menuId = m.id
      JOIN role r ON am.roleId = r.id
      WHERE r.id = '.$this->session->userdata('roleId').'
    ')->result_array();
  }
  public function index()
  {
   redirect('supervisor/manageShipReceivable'); 
  }

  public function manageShipReceivable() {
    $data['title'] = 'Kelola Data Piutang Kapal';
    $data['profile'] = $this->getProfile();
    $data['menu'] = $this->getAccessMenu();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('supervisor/manageShipReceivable');
    $this->load->view('template/footer');
  }
}