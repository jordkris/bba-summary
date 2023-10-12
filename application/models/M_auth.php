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
	public function checkSession($webSession)
	{
		$status = false;
		if ($webSession) {
			$dbResponse = $this->m_db->selectByCustom('users', 'session', $webSession);
			if (!$dbResponse->error['code'] && $dbResponse->output->num_rows() > 0) {
				$status = true;
			}
		}
		return $status;
	}
}
