<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <button type="button" class="btn btn-primary" onclick="addData('Tambah Data Piutang Kapal', 'shipreceivabledata')">Tambah Data Piutang Kapal <i class="bx bx-plus"></i></button>
      <div class="table-responsive-lg">
        <table id="shipReceivable" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Kapal</th>
              <th>Pemilik Kapal</th>
              <th>Tanggal Invoice</th>
              <th>Status Invoice</th>
              <th>Tanggal Kirim Invoice</th>
              <th>Due date</th>
              <th>Alert 1</th>
              <th>Alert 2</th>
              <th>Alert 3</th>
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
<script src="<?= base_url(); ?>/assets/js/manage/manageShipReceivable.js"></script>
<!-- / Content -->