<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model(array('m_auth', 'm_db'));
	}

	public function index()
	{
		$this->load->view('welcome_message');
	}
}
