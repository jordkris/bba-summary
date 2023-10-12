<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Auth extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(['m_auth']);
	}

	public function index()
	{
		$this->webSession = $this->session->userdata('session');
    if ($this->m_auth->checkSession($this->webSession)) redirect('api/processLogin/'.$this->webSession);
		redirect('auth/login');
	}
	public function login () {
		$data['title'] = 'Login';
		$this->load->view('auth/login', $data);
	}

	public function logout()
	{	
		$this->m_auth->unsetSession($this->session->userdata('username'));
		redirect('auth');
	}
}
