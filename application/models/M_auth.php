<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_auth extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(['m_db']);
		$this->load->library('session');
	}
	public function setSession($data)
	{
		foreach($data as $key => $value) {
			$this->session->set_userdata($key, $value);
		}
	}

	public function unsetSession($id)
	{
		$data = [
			'session' => null
		];
		$this->m_db->update('users', $data, $id);
		$this->session->unset_userdata();
	}
}
