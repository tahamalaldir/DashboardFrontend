<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark side-fixed"
  >
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link
          to="/dashboard"
          class="nav-link text-white"
          active-class="active"
          aria-current="page"
        >
          <i class="fas fa-home mr-2"></i>
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/kullanicilar"
          active-class="active"
          class="nav-link text-white"
          aria-current="page"
        >
          <i class="fas fa-users mr-2"></i>
          Kullanıcılar Ve Rol Yönetimi
        </router-link>
      </li>
      <li>
        <router-link
          to="/urunler"
          active-class="active"
          class="nav-link text-white"
        >
          <i class="fas fa-users mr-2"></i>
          Ürünler
        </router-link>
      </li>
      <li>
        <router-link
          to="/satislar"
          active-class="active"
          class="nav-link text-white"
        >
          <i class="fas fa-users mr-2"></i>
          Satışlar
        </router-link>
      </li>
      <li>
        <router-link
          to="/musteriler"
          active-class="active"
          class="nav-link text-white"
        >
          <i class="fas fa-users mr-2"></i>
          Müşteriler
        </router-link>
      </li>
    </ul>
    <button type="button" class="btn btn-outline-light">Çıkış</button>
  </div>
</template>

<script>
export default {
  name: "SideNav",
};
</script>
<style>
.active {
  background-color: blue;
  color: brown;
}
.side-fixed {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
}
</style>
