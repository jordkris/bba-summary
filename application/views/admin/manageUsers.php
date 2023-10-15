<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <button type="button" class="btn btn-primary" onclick="addData('Tambah Data User', 'users')">Tambah Data User <i class="bx bx-plus"></i></button>
      <div class="table-responsive-lg">
        <table id="users" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Updated Date</th>
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
<script src="<?= base_url(); ?>/assets/js/manage/manageUsers.js"></script>
<!-- / Content -->