<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends CI_Controller
{
  private $table = 'users';
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_db']);
  }
  public function getAll()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'get') {
        $dbResponse = $this->m_db->selectAll($this->table);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          $response->message = 'Internal server error';
        }
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->status = 500;
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function getById($id)
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'get') {
        $dbResponse = $this->m_db->selectById($this->table, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          $response->message = 'Internal server error';
        }
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->status = 500;
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }
  public function add()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'post') {
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->insert($this->table, $data);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          $response->message = 'Internal server error';
        }
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->status = 500;
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function update($id)
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'post') {
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->update($this->table, $data, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          $response->message = 'Internal server error';
        }
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->status = 500;
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  
  public function delete($id)
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'delete') {
        $dbResponse = $this->m_db->delete($this->table, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          $response->message = 'Internal server error';
        }
      } else {
        throw new Exception('This method is not supported');
      }
    } catch (Exception $e) {
      $response->status = 500;
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }
}
