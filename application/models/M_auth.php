<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_auth extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
	}
	public function set_session($uuid, $id)
	{
		$data = array(
			'SESSION_ID' => $uuid
		);
		$this->oracle->where('ID', $id);
		$this->oracle->update('USERS', $data);
	}

	public function unsetSession()
	{
		if (isset($_COOKIE['session_id'])) {
			unset($_COOKIE['session_id']);
			setcookie('session_id', '', time() - 3600, '/');
		}
		shell_exec('rmdir /s "' . APPPATH . 'cache\session" /q');
	}
}
