<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api extends CI_Controller
{
  public $table;
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_db']);
    $header = $this->input->request_headers();
    $this->table = isset($header['table']) ? $header['table'] : null;
  }
  public function getAll()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'get') {
        if (!$this->table) throw new Exception('Table is required');
        $dbResponse = $this->m_db->selectAll($this->table);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output->result_array();
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          throw new Exception('Internal server error');
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
        if (!$this->table) throw new Exception('Table is required');
        $dbResponse = $this->m_db->selectById($this->table, $id);
        if (!$dbResponse->error['code']) {
          if ($dbResponse->output->num_rows() > 0) {
            $response->output = $dbResponse->output->row_array();
            $response->status = 200;
            $response->message = 'Success';
          } else {
            $response->status = 404;
            $response->message = 'Data user not found';
          }
        } else {
          $response->messageDetail = $dbResponse->error;
          throw new Exception('Internal server error');
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
        if (!$this->table) throw new Exception('Table is required');
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->insert($this->table, $data);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          throw new Exception('Internal server error');
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
        if (!$this->table) throw new Exception('Table is required');
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->update($this->table, $data, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          throw new Exception('Internal server error');
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
        if (!$this->table) throw new Exception('Table is required');
        $dbResponse = $this->m_db->delete($this->table, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          throw new Exception('Internal server error');
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

  public function login()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'post') {
        $data = json_decode($this->input->raw_input_stream, true);
        $this->table = 'users';
        $dbResponseOfUser = $this->m_db->selectByCustom($this->table, 'username', $data['username']);
        if (!$dbResponseOfUser->error['code']) {
          if (count($dbResponseOfUser->output) > 0) {
            if (md5($data['password']) == $dbResponseOfUser->output->row_array()['password']) {
              $session = md5(time());
              $dbResponseOfSession = $this->m_db->update($this->table, ['session' => $session], $dbResponseOfUser->output['id']);
              if (!$dbResponseOfSession->error['code']) {
                $response->output = $session;
                $response->status = 200;
                $response->message = 'Success';
              } else {
                $response->messageDetail = $dbResponseOfSession->error;
                throw new Exception('Internal server error');
              }
            } else {
              throw new Exception('Internal server error');
            }
          } else {
            throw new Exception('Internal server error');
          }
        } else {
          $response->messageDetail = $dbResponseOfUser->error;
          throw new Exception('Internal server error');
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
