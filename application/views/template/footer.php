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
<div class="modal fade" id="bbaModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="bbaModalTitle"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

<script src="<?= base_url(); ?>/assets/js/custom.js"></script>
</body>

</html>