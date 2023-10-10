<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_db']);
  }
  public function getAll()
  {
    header('Content-Type: application/json');
    $response = new stdClass();
    $response->status = '500';
    $response->data = null;
    try {
      if ($this->input->method() == 'get') {
        $response->data = $this->m_db->selectAll('users');
        $response->message = 'Success';
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo json_encode($response);
  }

  public function getById($id)
  {
    header('Content-Type: application/json');
    $response = new stdClass();
    $response->status = '500';
    $response->data = null;
    try {
      if ($this->input->method() == 'get') {
        $response->data = $this->m_db->selectById('users', $id);
        $response->message = 'Success';
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo json_encode($response);
  }
  public function add()
  {
    header('Content-Type: application/json');
    $response = new stdClass();
    $response->status = '500';
    $response->data = null;
    try {
      if ($this->input->method() == 'post') {
        $data = json_decode($this->input->raw_input_stream, true);
        $response->data = $this->m_db->insert('users', $data);
        $response->message = 'Success';
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo json_encode($response);
  }
}
