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

	public function unsetSession($id)
	{
		$data = [
			'session' => null
		];
		$this->m_db->update('users', $data, $id);
		$this->session->unset_userdata();
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
