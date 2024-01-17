<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api extends CI_Controller
{
  public $table;
  public $webSession;
  public $month;
  public $branchId;
  public function __construct()
  {
    parent::__construct();
    $this->load->model(['m_auth', 'm_db']);
    $header = $this->input->request_headers();
    $this->table = isset($header['table']) ? $header['table'] : null;
    $this->column = isset($header['column']) ? $header['column'] : null;
    $this->webSession = isset($header['session']) ? $header['session'] : null;
    $this->month = isset($header['month']) ? $header['month'] : null;
    $this->branchId = isset($header['branchid']) ? $header['branchid'] : null;
  }


  public function getAll()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();
    try {
      if ($this->input->method() == 'get') {
        if (!$this->table) {
          $response->status = 400;
          throw new Exception('Table is required');
        }
        // if (!$this->m_auth->checkSession($this->webSession)) {
        //   $response->status = 401;
        //   throw new Exception('Unauthorized');
        // }
        $dbResponse = $this->m_db->selectAll($this->table);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output->result_array();
          if ($this->input->get('relationConfig')) {
            $relationConfig = json_decode($this->input->get('relationConfig'), true);
            $relationData = [];
            $sourceColumn = [];
            foreach ($relationConfig as $rc) {
              $relationResult = $this->m_db->selectAll($rc['table'])->output->result_array();
              $relationData[$rc['sourceColumn']] = [];
              foreach ($relationResult as $r) {
                $relationData[$rc['sourceColumn']][$r['id']] = $r;
              }
              $sourceColumn[] = $rc['sourceColumn'];
            }
            foreach ($response->output as &$ro) {
              foreach ($ro as $key => $value) {
                if (in_array($key, $sourceColumn)) {
                  $ro[$key] = $relationData[$key][$value]['name'];
                }
              }
            }
          }
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
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
        if (!$this->table) {
          $response->status = 400;
          throw new Exception('Table is required');
        }
        // if (!$this->m_auth->checkSession($this->webSession)) {
        //   $response->status = 401;
        //   throw new Exception('Unauthorized');
        // }
        $dbResponse = null;
        if ($this->column) {
          $dbResponse = $this->m_db->selectByCustom($this->table, $this->column, $id);
        } else {
          $dbResponse = $this->m_db->selectById($this->table, $id);
        }
        if (!$dbResponse->error['code']) {
          if ($dbResponse->output->num_rows() > 0) {
            $response->output = $this->column ? $dbResponse->output->result_array() : $dbResponse->output->row_array();
            $response->status = 200;
            $response->message = 'Success';
          } else {
            $response->status = 404;
            $response->message = 'Data not found';
          }
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
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
        if (!$this->table) {
          $response->status = 400;
          throw new Exception('Table is required');
        }
        if (!$this->m_auth->checkSession($this->webSession)) {
          $response->status = 401;
          throw new Exception('Unauthorized');
        }
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->insert($this->table, $data);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
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
        if (!$this->table) {
          $response->status = 400;
          throw new Exception('Table is required');
        }
        if (!$this->m_auth->checkSession($this->webSession)) {
          $response->status = 401;
          throw new Exception('Unauthorized');
        }
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->update($this->table, $data, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {

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
        if (!$this->table) {
          $response->status = 400;
          throw new Exception('Table is required');
        }
        if (!$this->m_auth->checkSession($this->webSession)) {
          $response->status = 401;
          throw new Exception('Unauthorized');
        }
        $dbResponse = $this->m_db->delete($this->table, $id);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function updateTarget()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'post') {
        if (!$this->month) {
          $response->status = 400;
          throw new Exception('Month is required');
        }
        if (!$this->branchId) {
          $response->status = 400;
          throw new Exception('Branch Id is required');
        }
        if (!$this->m_auth->checkSession($this->webSession)) {
          $response->status = 401;
          throw new Exception('Unauthorized');
        }
        $data = json_decode($this->input->raw_input_stream, true);
        $dbResponse = $this->m_db->updateTarget($data, $this->month, $this->branchId);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output;
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {

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
          if ($dbResponseOfUser->output->num_rows() > 0) {
            if (md5($data['password']) == $dbResponseOfUser->output->row_array()['password']) {
              $newSession = md5(time());
              $dbResponseOfSession = $this->m_db->update($this->table, ['session' => $newSession], $dbResponseOfUser->output->row_array()['id']);
              if (!$dbResponseOfSession->error['code']) {
                $response->output = $newSession;
                $response->status = 200;
                $response->message = 'Success';
              } else {
                $response->messageDetail = $dbResponseOfSession->error;
                $response->status = 500;
                throw new Exception('Internal server error');
              }
            } else {
              $response->status = 500;
              throw new Exception('Wrong username or password');
            }
          } else {
            $response->status = 500;
            throw new Exception('Wrong username or password');
          }
        } else {
          $response->messageDetail = $dbResponseOfUser->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {

      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function processLogin($redirectSession)
  {
    $profile = [];
    $dbResponse = $this->m_db->selectByCustom('users', 'session', $redirectSession);
    if (!$dbResponse->error['code']) {
      $profile['username'] = $dbResponse->output->row_array()['username'];
      $profile['roleId'] = $dbResponse->output->row_array()['roleId'];
      $profile['branchId'] = $dbResponse->output->row_array()['branchId'];
      $profile['session'] = $redirectSession;
      $this->m_auth->setSession($profile);
      if ($profile['roleId'] == 1) {
        redirect('admin');
      } else if ($profile['roleId'] == 2) {
        redirect('supervisor');
      } else if ($profile['roleId'] == 3) {
        redirect('staff');
      } else if ($profile['roleId'] == 4) {
        redirect('tug');
      } else {
        redirect('pbm');
      }
    } else {
      throw new Exception('Internal server error');
    }
  }

  public function logout()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'post') {
        $data = json_decode($this->input->raw_input_stream, true);
        $this->table = 'users';
        $dbResponse = $this->m_db->updateByCustom($this->table, ['session' => null], 'username', $data['username']);
        if (!$dbResponse->error['code']) {
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function getMonthlyGrowth()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'get') {
        $dbResponse = $this->m_db->getMonthlyGrowth();
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output->result_array();
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function getShipBranchDaily()
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'get') {
        $dbResponse = $this->m_db->getShipBranchDaily();
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output->result_array();
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }

  public function homepage($feature)
  {
    header('Content-Type: application/json');
    $response = new ApiResponse();

    try {
      if ($this->input->method() == 'get') {
        $dbResponse = $this->m_db->getHomePage($feature);
        if (!$dbResponse->error['code']) {
          $response->output = $dbResponse->output->result_array();
          $response->status = 200;
          $response->message = 'Success';
        } else {
          $response->messageDetail = $dbResponse->error;
          $response->status = 500;
          throw new Exception('Internal server error');
        }
      } else {
        $response->status = 405;
        throw new Exception('This method is not allowed');
      }
    } catch (Exception $e) {
      $response->message = $e->getMessage();
    }
    echo $response->toJson();
  }
}
