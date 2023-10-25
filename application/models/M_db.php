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

  public function getMonthlyGrowth()
  {
    $response = new DbResponse();
    $response->output =  $this->db->query("
      SELECT 
        DATE_FORMAT(issuedTimeSPB,'%Y-%m') AS month,  
        count(id) AS total, 
        ROUND(100 * (count(*) - lag(count(*), 1) over (order by issuedTimeSPB)) / lag(count(*), 1) over (order by issuedTimeSPB), 2) as growth
      FROM shipdata
      GROUP BY YEAR(issuedTimeSPB), MONTH(issuedTimeSPB)
      ORDER BY issuedTimeSPB
    ");
    $response->error = $this->db->error();
    return $response;
  }

  public function getShipBranchDaily()
  {
    $response = new DbResponse();
    $response->output =  $this->db->query("
      SELECT b.name AS branch, count(sd.id) AS total
      FROM shipdata sd
      JOIN branch b ON b.id = sd.branchId
      WHERE DATE(sd.issuedTimeSPB) = CURDATE()
      GROUP BY sd.branchId
      ORDER BY COUNT(sd.id) DESC;
    ");
    $response->error = $this->db->error();
    return $response;
  }

  public function getHomePage($feature)
  {
    $response = new DbResponse();
    switch ($feature) {
      case 'totalShips':
        $response->output = $this->db->query("
          SELECT b.name, COUNT(sd.id) AS count FROM shipdata sd
          JOIN branch b ON b.id = sd.branchId
          WHERE MONTH(sd.issuedTimeSPB) = MONTH(CURRENT_DATE()) AND YEAR(sd.issuedTimeSPB) = YEAR(CURRENT_DATE()) 
          GROUP BY b.id
          ORDER BY count DESC
        ");
        break;
      case 'wastingTime':
        $response->output = $this->db->query("
          SELECT b.name, SUM(sd.wastingTimeNumber) AS count FROM shipdata sd
          JOIN branch b ON b.id = sd.branchId
          WHERE MONTH(sd.issuedTimeSPB) = MONTH(CURRENT_DATE()) AND YEAR(sd.issuedTimeSPB) = YEAR(CURRENT_DATE()) 
          GROUP BY b.id
          ORDER BY count ASC
        ");
        break;
      case 'totalTonage':
        $response->output = $this->db->query("
          SELECT b.name, SUM(pd.cargoQuantity) AS count FROM pbmdata pd
          JOIN branch b ON b.id = pd.branchId
          WHERE MONTH(pd.createdDate) = MONTH(CURRENT_DATE()) AND YEAR(pd.createdDate) = YEAR(CURRENT_DATE()) 
          GROUP BY b.id
          ORDER BY count DESC;
        ");
        break;
      case 'loadingRate':
        $response->output = $this->db->query("
          SELECT b.name, SUM(pd.totalHoursNumber) AS count FROM pbmdata pd
          JOIN branch b ON b.id = pd.branchId
          WHERE MONTH(pd.createdDate) = MONTH(CURRENT_DATE()) AND YEAR(pd.createdDate) = YEAR(CURRENT_DATE()) 
          GROUP BY b.id
          ORDER BY count ASC;
          ");
        break;
      case 'totalShipsAssist':
        $response->output = $this->db->query("
          SELECT b.name, COUNT(td.id) AS count FROM tugdata td
          JOIN branch b ON b.id = td.branchId
          WHERE MONTH(td.connectTime) = MONTH(CURRENT_DATE()) AND YEAR(td.connectTime) = YEAR(CURRENT_DATE()) 
          GROUP BY b.id
          ORDER BY count DESC;
        ");
        break;
      case 'totalAssistTime':
        $response->output = $this->db->query("
          SELECT b.name, SUM(td.assistDurationNumber) AS count FROM tugdata td
          JOIN branch b ON b.id = td.branchId
          WHERE MONTH(td.connectTime) = MONTH(CURRENT_DATE()) AND YEAR(td.connectTime) = YEAR(CURRENT_DATE()) 
          GROUP BY b.id
          ORDER BY count ASC;
        ");
        break;
    }
    $response->error = $this->db->error();
    return $response;
  }
}
