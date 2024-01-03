<div class="content-backdrop fade"></div>
</div>
<!-- Content wrapper -->
</div>
<!-- / Layout page -->
</div>

<!-- Overlay -->
<div class="layout-overlay layout-menu-toggle"></div>
</div>
<!-- / Layout wrapper -->

<!-- Modals -->
<div class="modal fade" id="bbaModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="bbaModalTitle"></h5>
        <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="bbaModalBody"></div>
      <div class="modal-footer" id="bbaModalFooter"></div>
    </div>
  </div>
</div>

<div class="modal fade" id="passwordModal" aria-hidden="true" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passwordModalTitle">Generate Password Hash</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="passwordModalBody">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-floating">
              <input type="text" class="form-control" id="passwordInput" aria-describedby="floatingInputHelp" />
              <label>Password (plain)</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Isikan password di sini
              </div>
              <div class="dropdown-divider"></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-floating">
              <input type="text" class="form-control" id="passwordOutput" aria-describedby="button-addon2" />
              <label>Password (hash)</label>
              <div class="form-text">
                <i class="bx bx-info-circle"></i> Password hash akan muncul di sini. Salin ini untuk mengganti passsword baru
              </div>
              <div class="dropdown-divider"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" id="passwordModalFooter">
        <button class="btn btn-primary" data-bs-target="#bbaModal" data-bs-toggle="modal" data-bs-dismiss="modal">
          <i class="bx bx-caret-left-circle"></i> Back
        </button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="activityTimeModal" aria-hidden="true" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="activityTimeModalTitle"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="activityTimeModalBody"></div>
      <div class="modal-footer" id="activityTimeModalFooter"></div>
    </div>
  </div>
</div>
<!-- Helpers -->
<script src="<?= base_url(); ?>/assets/vendor/js/helpers.js"></script>

<!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
<!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
<script src="<?= base_url(); ?>/assets/js/config.js"></script>

<!-- Core JS -->
<!-- build:js assets/vendor/js/core.js -->
<!-- <script src="<?= base_url(); ?>/assets/vendor/libs/jquery/jquery.js"></script> -->
<script src="//unpkg.com/jquery@3.4.1/dist/jquery.min.js"></script>
<script src="<?= base_url(); ?>/assets/vendor/libs/popper/popper.js"></script>
<script src="<?= base_url(); ?>/assets/vendor/js/bootstrap.js"></script>
<script src="<?= base_url(); ?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>


<!-- <script src="//unpkg.com/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script src="<?= base_url(); ?>/assets/vendor/js/menu.js"></script>
<!-- endbuild -->

<!-- Vendors JS -->
<script src="<?= base_url(); ?>/assets/vendor/libs/apex-charts/apexcharts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<!-- generate me library for select2 -->

<!-- Main JS -->
<script src="<?= base_url(); ?>/assets/js/main.js"></script>

<!-- Page JS -->
<script src="<?= base_url(); ?>/assets/js/dashboards-analytics.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/datatables.net-bs4@1.13.6/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/dataTables.jqueryui.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.colVis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
  localStorage.setItem('session', '<?= $profile['session']; ?>');
  localStorage.setItem('roleId', '<?= $this->session->userdata('roleId'); ?>');
  localStorage.setItem('branchId', '<?= $this->session->userdata('branchId'); ?>');
  localStorage.setItem('baseUrl', '<?= base_url(); ?>'.slice(0, -1));
</script>
<script src="<?= base_url(); ?>/assets/js/class/inputBox.js"></script>
<script src="<?= base_url(); ?>/assets/js/class/selectBox.js"></script>
<script src="<?= base_url(); ?>/assets/js/class/formBuilder.js"></script>
<script src="<?= base_url(); ?>/assets/js/manageData.js"></script>
<script src="<?= base_url(); ?>/assets/js/manage/<?= $this->uri->segment(2); ?>.js"></script>

<!-- Place this tag in your head or just before your close body tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
<script src="<?= base_url(); ?>/assets/js/custom.js"></script>
</body>
</html>