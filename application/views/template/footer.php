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
      <div class="modal-footer" id="bbaModalFooter">
        <!-- <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
<!-- Core JS -->
<!-- build:js assets/vendor/js/core.js -->
<script src="<?= base_url(); ?>/assets/vendor/libs/jquery/jquery.js"></script>
<script src="<?= base_url(); ?>/assets/vendor/libs/popper/popper.js"></script>
<script src="<?= base_url(); ?>/assets/vendor/js/bootstrap.js"></script>
<script src="<?= base_url(); ?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

<script src="<?= base_url(); ?>/assets/vendor/js/menu.js"></script>
<!-- endbuild -->

<!-- Vendors JS -->
<script src="<?= base_url(); ?>/assets/vendor/libs/apex-charts/apexcharts.js"></script>
<!-- generate me library for select2 -->

<!-- Main JS -->
<script src="<?= base_url(); ?>/assets/js/main.js"></script>

<!-- Page JS -->
<script src="<?= base_url(); ?>/assets/js/dashboards-analytics.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/dataTables.jqueryui.min.js"></script>
<script>
  localStorage.setItem('session', '<?= $profile['session']; ?>');
  localStorage.setItem('baseUrl', '<?= base_url(); ?>'.slice(0, -1));
</script>
<script src="<?= base_url(); ?>/assets/js/class/inputBox.js"></script>
<script src="<?= base_url(); ?>/assets/js/class/formBuilder.js"></script>
<script src="<?= base_url(); ?>/assets/js/manageData.js"></script>

<!-- Place this tag in your head or just before your close body tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>

</body>

</html>