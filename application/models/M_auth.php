<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_auth extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(['m_db']);
	}
	public function setSession($data)
	{
		$this->session->set_userdata($data);
	}

	public function unsetSession($username)
	{
		$this->m_db->updateByCustom('users', ['session' => null], 'username', $username);
		$this->session->sess_destroy();
	}
	public function checkSession($webSession, $pathMode = false)
	{
		$status = false;
		if ($webSession) {
			$menuPath = $this->uri->segment(1) . '/' . $this->uri->segment(2);
			$pathCondition = $pathMode ? 'AND m.path = "' . $menuPath . '"' : '';
			$roleCondition = $pathMode ? 'AND am.roleId = ' . $this->session->userdata('roleId') : '';
			$query = '
				SELECT u.id FROM users u
				JOIN accessmenu am ON am.roleId = u.roleId
				JOIN menu m ON am.menuId = m.id
				WHERE u.session = "' . $webSession . '"
				' . $roleCondition . ' ' . $pathCondition . '
			';
			$count = $this->db->query($query)->num_rows();
			if ($count > 0) $status = true;
		}
		return $status;
	}
}
