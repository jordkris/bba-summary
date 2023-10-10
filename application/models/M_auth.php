<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_auth extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(['m_db']);
	}
	public function setSession($session, $id)
	{
		$data = [
			'session' => $session
		];
		$this->m_db->update('users', $data, $id);
		$this->session->set_userdata($data);
	}

	public function unsetSession($id)
	{
		$data = [
			'session' => ''
		];
		$this->m_db->update('users', $data, $id);
		$this->session->unset_userdata('session');
	}
}
