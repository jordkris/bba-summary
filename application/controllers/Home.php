<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    // $this->load->model(['m_db']);
  }

  private function getTodayShips()
  {
    $query = "
      SELECT id
      FROM shipdata 
      WHERE DATE(issuedTimeSPB) = CURDATE()
    ";
    return $this->db->query($query)->num_rows();
  }
  public function index()
  {
    $data['todayShips'] = $this->getTodayShips();
    $this->load->view('main/homepage', $data);
  }
}
