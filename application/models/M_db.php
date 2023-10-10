<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_db extends CI_Model
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
  public function selectAll($table)
  {
    return $this->db->get($table)->result_array();
  }
  /**
   * Retrieves a single row from the specified table by its id.
   *
   * @param string $tableName The name of the table.
   * @param int $id The id of the row to retrieve.
   * @throws Exception If there is an error retrieving the row.
   * @return array The retrieved row as an associative array.
   */
  public function selectById($table, $id)
  {
    $this->db->where('id', $id);
    return $this->db->get($table)->row_array();
  }

  public function insert($table, $data)
  {
    $this->db->insert($table, $data);
    return $this->db->error();
  }

  /**
   * Updates a record in the specified table.
   *
   * @param string $tableName The name of the table.
   * @param array $data An associative array of column names and their new values.
   * @param int $id The ID of the record to update.
   * @throws Exception A description of the exception that can be thrown.
   * @return bool True on success, false on failure.
   */
  public function update($tableName, $data, $id)
  {
    $this->db->where('id', $id);
    $this->db->update($tableName, $data);
    return $this->db->error();
  }

  /**
   * Deletes a record from the specified table based on the provided ID.
   *
   * @param string $table The name of the table from which to delete the record.
   * @param int $id The ID of the record to be deleted.
   * @return bool True if the record was successfully deleted, false otherwise.
   */
  public function delete($table, $id)
  {
    $this->db->where('id', $id);
    $this->db->delete($table);
    return $this->db->error();
  }
}
