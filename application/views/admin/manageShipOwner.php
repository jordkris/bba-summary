<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <button type="button" class="btn btn-primary" onclick="addData('Tambah Data Pemilik Kapal', 'shipowner')">Tambah Pemilik Kapal <i class="bx bx-plus"></i></button>
      <div class="table-responsive-lg">
        <table id="shipOwner" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Pemilik Kapal</th>
              <th>PIC</th>
              <th>Kontak</th>
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
<script src="<?= base_url(); ?>/assets/js/manage/manageShipOwner.js"></script>
<!-- / Content -->