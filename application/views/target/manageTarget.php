<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4">Dashboard <?= $profile['role']; ?> Cabang <?= $profile['branch']; ?></h4>
  <div class="card">
    <h5 class="card-header"><?= $title; ?></h5>
    <div class="card-body">
      <form id="monthlyTarget">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-floating">
              <input name="totalShips" type="number" class="form-control" aria-describedby="floatingInputHelp" />
              <label>Number of Ships</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Target total kapal (unit)
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-floating">
              <input name="wastingTime" type="number" class="form-control" aria-describedby="floatingInputHelp" />
              <label>Wasting Time (jam)</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Target wasting time (jam)
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-floating">
              <input name="totalTonage" type="number" class="form-control" aria-describedby="floatingInputHelp" />
              <label>Total Tonnage (Ton)</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Target jumlah muatan kapal (ton)
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-floating">
              <input name="loadingRate" type="number" class="form-control" aria-describedby="floatingInputHelp" />
              <label>Loading / Discharging Rate (jam)</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Target lama kegiatan (jam)
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-floating">
              <input name="totalShipsAssist" type="number" class="form-control" aria-describedby="floatingInputHelp" />
              <label>Number of Ship's Assist</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Target total kapal tug
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-floating">
              <input name="totalAssistTime" type="number" class="form-control" aria-describedby="floatingInputHelp" />
              <label>Total Assist Time (jam)</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Target lama assit (jam)
              </div>
            </div>
          </div>
      </form>
      <button id="submitTarget" type="button" class="btn btn-success" style="float: right;">
        Simpan <i class="bx bx-save"></i>
      </button>
    </div>
  </div>
</div>
<!-- / Content -->