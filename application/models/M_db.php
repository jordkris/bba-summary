<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_db extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
  }

  public function selectAll($table)
  {
    $response = new DbResponse();
    $response->output = $this->db->get($table);
    $response->error = $this->db->error();
    return $response;
  }

  public function selectById($table, $id)
  {
    $response = new DbResponse();
    $this->db->where('id', $id);
    $response->output = $this->db->get($table);
    $response->error = $this->db->error();
    return $response;
  }

  public function selectByCustom($table, $key, $value)
  {
    $response = new DbResponse();
    $this->db->where($key, $value);
    $response->output = $this->db->get($table);
    $response->error = $this->db->error();
    return $response;
  }

  public function insert($table, $data)
  {
    $response = new DbResponse();
    $response->output = $this->db->insert($table, $data);
    $response->error = $this->db->error();
    return $response;
  }

  public function update($tableName, $data, $id)
  {
    $response = new DbResponse();
    $this->db->where('id', $id);
    $response->output = $this->db->update($tableName, $data);
    $response->error = $this->db->error();
    return $response;
  }

  public function updateByCustom($tableName, $data, $key, $value)
  {
    $response = new DbResponse();
    $this->db->where($key, $value);
    $response->output = $this->db->update($tableName, $data);
    $response->error = $this->db->error();
    return $response;
  }

  public function delete($table, $id)
  {
    $response = new DbResponse();
    $this->db->where('id', $id);
    $response->output =  $this->db->delete($table);
    $response->error = $this->db->error();
    return $response;
  }
}
