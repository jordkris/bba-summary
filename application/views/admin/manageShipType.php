<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <button type="button" class="btn btn-primary" onclick="addData('Tambah Data Tipe Kapal', 'shiptype')">Tambah Tipe Kapal <i class="bx bx-plus"></i></button>
      <div class="table-responsive-lg">
        <table id="shipType" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipe Kapal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <div class="spinner-border text-success tableSpinner" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<!-- / Content -->