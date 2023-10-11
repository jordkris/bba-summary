<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(array('m_auth', 'm_db'));
	}

	private function isLoggedIn() {
		# get userdata
		$userdata = $this->session->userdata('roleId');
		echo $userdata;
	}

	public function index()
	{
		$data['title'] = 'Login';
		$this->load->view('auth/login', $data);
	}
}
