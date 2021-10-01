<template>
  <nav class="navbar navbar-light px-0 border-bottom bg-light">
    <div class="d-flex">
      <button type="button" class="btn">
        <i class="fas fa-bars"></i>
      </button>
      <h3 class="my-auto ml-2">{{ title }}</h3>
    </div>
    <div>
      <h5 class="my-auto mx-2">Merhaba,Taha Malaldır</h5>
    </div>
  </nav>
</template>

<script>
export default {
  props: { title: String },
};
</script>

<style></style>
