<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <button type="button" class="btn btn-primary" onclick="addData('Tambah Cabang', 'branch')">Tambah Cabang <i class="bx bx-plus"></i></button>
      <div id="datatableProgress" class="spinner-grow text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="table-responsive-lg">
        <table id="branch" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Cabang</th>
              <th>Number of Ships</th>
              <th>Wasting Time</th>
              <th>Total Tonnage</th>
              <th>Loading / Discharging Rate</th>
              <th>Number of Ship's Assist</th>
              <th>Total Assist Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<!-- / Content -->