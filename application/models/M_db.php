<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_auth extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Retrieves all records from the specified table.
   *
   * @param string $tableName The name of the table to retrieve records from.
   * @return array An array of records from the table.
   */
  public function selectAll($tableName)
  {
    return $this->db->get($tableName)->result_array();
  }
  /**
   * Retrieves a single row from the specified table by its id.
   *
   * @param string $tableName The name of the table.
   * @param int $id The id of the row to retrieve.
   * @throws Exception If there is an error retrieving the row.
   * @return array The retrieved row as an associative array.
   */
  public function selectById($tableName, $id)
  {
    $this->db->where('id', $id);
    return $this->db->get($tableName)->row_array();
  }

  public function update($tableName, $data, $id)
  {
    for ($data as $key => $value) {
      
    }
  }
}
