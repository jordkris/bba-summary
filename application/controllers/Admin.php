<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends CI_Controller
{
  private $webSession;
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_auth', 'm_db']);
    $this->webSession = $this->session->userdata('session');
    if (!$this->m_auth->checkSession($this->webSession)) redirect('login');
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
  public function index()
  {
    $data['title'] = 'Manage Users';
    $data['profile'] = $this->getProfile();
    $this->load->view('template/header', $data);
    $this->load->view('template/sidebar');
    $this->load->view('template/navbar');
    $this->load->view('admin/manageUsers');
    $this->load->view('template/footer');
  }
}
