<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Tambah Data Piutang Kapal</button>
      <div class="table-responsive-lg">
        <table id="shipName" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<!-- / Content -->