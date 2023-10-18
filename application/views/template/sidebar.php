<!-- Menu -->

<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
  <div class="app-brand demo">
    <a href="#" class="app-brand-link">
	  <div class="row">
		<div class="col-lg-12">
		  <img class="w-100" src="<?= base_url('assets');?>/img/icons/brands/LOGO-BSW-STANDART.png" alt="logo" />
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
    <?php foreach ($menu as $m) { ?>
      <li class="menu-item <?php if ($m['path'] == $this->uri->segment(1).'/'.$this->uri->segment(2)) echo 'active'; ?>">
        <a href="<?= base_url($m['path']); ?>" class="menu-link">
          <i class="<?= base_url($m['icon']) ?>"></i>&nbsp;
          <div data-i18n="Analytics"><?= $m['name']; ?></div>
        </a>
      </li>
    <?php } ?>
  </ul>
</aside>
<!-- / Menu -->

<!-- Layout container -->
<div class="layout-page">