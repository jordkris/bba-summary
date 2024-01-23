<!DOCTYPE html>

<html lang="en" class="light-style layout-menu-fixed" dir="ltr" data-theme="theme-default" data-assets-path="<?= base_url(); ?>/assets/" data-template="vertical-menu-template-free">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

  <title>BOSOWA BANDAR DASHBOARD</title>

  <meta name="description" content="" />

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="<?= base_url(); ?>/assets/img/favicon/favicon.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

  <!-- Icons. Uncomment required icon fonts -->
  <link rel="stylesheet" href="<?= base_url(); ?>/assets/vendor/fonts/boxicons.css" />

  <!-- Core CSS -->
  <link rel="stylesheet" href="<?= base_url(); ?>/assets/vendor/css/core.css" class="template-customizer-core-css" />
  <link rel="stylesheet" href="<?= base_url(); ?>/assets/vendor/css/theme-default.css" class="template-customizer-theme-css" />
  <link rel="stylesheet" href="<?= base_url(); ?>/assets/css/demo.css" />

  <!-- Vendors CSS -->
  <link rel="stylesheet" href="<?= base_url(); ?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

  <link rel="stylesheet" href="<?= base_url(); ?>/assets/vendor/libs/apex-charts/apex-charts.css" />

  <!-- Page CSS -->

  <!-- Helpers -->
  <script src="<?= base_url(); ?>/assets/vendor/js/helpers.js"></script>

  <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
  <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
  <script src="<?= base_url(); ?>/assets/js/config.js"></script>
  <script>
    localStorage.setItem('baseUrl', '<?= base_url(); ?>'.slice(0, -1));
  </script>
</head>

<body>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <!-- Menu -->

      <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
        <div class="app-brand demo">
          <a href="#" class="app-brand-link">
            <div class="row">
              <div class="col-lg-12">
                <img class="w-100" src="<?= base_url('assets'); ?>/img/icons/brands/LOGO-BSW-STANDART.png" alt="logo" />
              </div>
            </div>
          </a>

          <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div class="menu-inner-shadow"></div>

        <ul class="menu-inner py-1">
          <!-- Dashboard -->
          <li class="menu-item active">
            <a href="#" class="menu-link">
              <i class="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">DASHBOARD</div>
            </a>
          </li>
          <!-- Login -->
          <li class="menu-item">
            <a href="<?= base_url('auth'); ?>" class="menu-link">
              <i class="menu-icon tf-icons bx bx-log-in"></i>
              <div data-i18n="Analytics">LOGIN</div>
            </a>
          </li>
          <br>
          <!-- Banner -->
          <li class="menu-item">
            <a href="<?= base_url('auth'); ?>" class="menu-link">
              <i><img src="https://i.ibb.co/nnghdHp/BANNER-WEB-PORTAL.png" alt="Gambar_Langit" style="width:200px;height:200px;"></i>
            </a>
          </li>
        </ul>
      </aside>
      <!-- / Menu -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Navbar -->

        <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
          <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
              <i class="bx bx-menu bx-sm"></i>
            </a>
          </div>

          <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <!-- Search -->
            <div class="navbar-nav align-items-center">
              <div class="nav-item d-flex align-items-center">
                <i class="bx bx-search fs-4 lh-0"></i>
                <input type="text" class="form-control border-0 shadow-none" placeholder="Bosowa Bandar" aria-label="Bosowa Bandar" />
              </div>
            </div>
            <!-- /Search -->

          </div>
        </nav>
        <!-- / Navbar -->

        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->

          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="d-flex align-items-end row">
                    <div class="col-sm-7">
                      <div class="card-body">
                        <h5 class="card-title text-primary">Welcome, Bosowa Bandar Dashboard! 🎉</h5>
                        <p class="mb-4">
                          We are a Shipping Agency, Stevedoring and Tug Assist Services Company in Indonesia.
                          <br>Becoming a Professional Company and International Standard.
                        </p>
                        <a href="#section-performance" class="btn btn-sm btn-outline-primary">Performance : January 2024</a>

                        <a href="#section-performance" class="btn btn-sm btn-outline-primary">Achievement Year by Year</a>
                      </div>
                    </div>
                    <div class="col-sm-5 text-center text-sm-left">
                      <div class="card-body pb-0 px-0 px-md-4">
                        <img src="<?= base_url(); ?>/assets/img/illustrations/man-with-laptop-light.png" height="140" alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dropdown-divider"></div>
            </div>
            <section id="section-performance">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title">Shipping Agency</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-9">
                        <div>Number of Ships</div>
                        <div id="totalShips" class="progress" style="height: 30px;">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; border-radius: 10rem;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <span id="totalShipsPercent"></span><br />
                        <a href="javascript:void(0);" class="badge rounded-pill bg-secondary text text-white" id="totalShipsDetail">Click for detail</a>
                      </div>
                      <div class="col-lg-9">
                        <div>Wasting Time</div>
                        <div id="wastingTime" class="progress" style="height: 30px;">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; border-radius: 10rem;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <span id="wastingTimePercent"></span><br />
                        <a href="javascript:void(0);" class="badge rounded-pill bg-secondary text text-white" id="wastingTimeDetail">Click for detail</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title">Stevedoring (PBM)</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-9">
                        <div>Total Tonnage</div>
                        <div id="totalTonage" class="progress" style="height: 30px;">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; border-radius: 10rem;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <span id="totalTonagePercent"></span><br />
                        <a href="javascript:void(0);" class="badge rounded-pill bg-secondary text text-white" id="totalTonageDetail">Click for detail</a>
                      </div>
                      <div class="col-lg-9">
                        <div>Loading / Discharging Rate</div>
                        <div id="loadingRate" class="progress" style="height: 30px;">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; border-radius: 10rem;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <span id="loadingRatePercent"></span><br />
                        <a href="javascript:void(0);" class="badge rounded-pill bg-secondary text text-white" id="loadingRateDetail">Click for detail</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title">Tug Assist Services</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-9">
                        <div>Number of Ship's Assist</div>
                        <div id="totalShipsAssist" class="progress" style="height: 30px;">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; border-radius: 10rem;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <span id="totalShipsAssistPercent"></span><br />
                        <a href="javascript:void(0);" class="badge rounded-pill bg-secondary text text-white" id="totalShipsAssistDetail">Click for detail</a>
                      </div>
                      <div class="col-lg-9">
                        <div>Total Assist Time</div>
                        <div id="totalAssistTime" class="progress" style="height: 30px;">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; border-radius: 10rem;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <span id="totalAssistTimePercent"></span><br />
                        <a href="javascript:void(0);" class="badge rounded-pill bg-secondary text text-white" id="totalAssistTimeDetail">Click for detail</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title">Summary Shipping Agency</h5>
                    </div>
                    <div class="card-body">
                      <canvas id="totalShipsSummary"></canvas>
                    </div>
                  </div>
                  <div class="dropdown-divider"></div>
                </div>
                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title">Summary Stevedoring</h5>
                    </div>
                    <div class="card-body">
                      <canvas id="totalTonageSummary"></canvas>
                    </div>
                  </div>
                  <div class="dropdown-divider"></div>
                </div>
                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title">Summary Tug Assist</h5>
                    </div>
                    <div class="card-body">
                      <canvas id="totalShipsAssistSummary"></canvas>
                    </div>
                  </div>
                  <div class="dropdown-divider"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <!-- / Content -->
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
  <div class="modal fade" id="homeModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="homeModalTitle"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="homeModalBody"></div>
        <div class="modal-footer" id="homeModalFooter"></div>
      </div>
    </div>
  </div>
  <!-- Core JS -->
  <!-- build:js assets/vendor/js/core.js -->
  <script src="<?= base_url(); ?>/assets/vendor/libs/jquery/jquery.js"></script>
  <script src="<?= base_url(); ?>/assets/vendor/libs/popper/popper.js"></script>
  <script src="<?= base_url(); ?>/assets/vendor/js/bootstrap.js"></script>
  <script src="<?= base_url(); ?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <script src="<?= base_url(); ?>/assets/vendor/js/menu.js"></script>
  <!-- endbuild -->

  <!-- Vendors JS -->
  <script src="<?= base_url(); ?>/assets/vendor/libs/apex-charts/apexcharts.js"></script>

  <!-- Main JS -->
  <script src="<?= base_url(); ?>/assets/js/main.js"></script>

  <!-- Page JS -->
  <!-- <script src="<?= base_url(); ?>/assets/js/dashboards-analytics.js"></script> -->
  <script src="<?= base_url(); ?>/assets/js/homepage.js"></script>

  <!-- Place this tag in your head or just before your close body tag. -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
</body>
<footer>
  <center>&copy;2024 Port Division | Bosowa Energy Group</center>
</footer>
<br></br>
<div class="buy-now">
  <a href="https://bosowabandar.com/auth" target="" class="btn btn-danger btn-buy-now">LOGIN
  </a>
</div>

</html>