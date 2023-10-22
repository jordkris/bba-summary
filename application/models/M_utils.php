<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_utils extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(['m_db']);
	}
  public function getRoleName()
  {
    $dbResponse = $this->m_db->selectById('role', $this->session->userdata('roleId'));
    if ($dbResponse->error['code']) throw new Exception($dbResponse->error['message']);
    return $dbResponse->output->row_array()['name'];
  }
  public function getBranchName()
  {
    $dbResponse = $this->m_db->selectById('branch', $this->session->userdata('branchId'));
    if ($dbResponse->error['code']) throw new Exception($dbResponse->error['message']);
    return $dbResponse->output->row_array()['name'];
  }
  public function getProfile()
  {
    return [
      'username' => $this->session->userdata('username'),
      'role' => $this->getRoleName(),
      'branch' => $this->getBranchName(),
      'session' => $this->session->userdata('session')
    ];
  }

  public function getAccessMenu() {
    return $this->db->query('
      SELECT m.name, m.path, m.icon 
      FROM accessmenu am 
      JOIN menu m ON am.menuId = m.id
      JOIN role r ON am.roleId = r.id
      WHERE r.id = '.$this->session->userdata('roleId').'
    ')->result_array();
  }
}