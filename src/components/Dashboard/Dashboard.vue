<template>
  <div class="col">
    <fix-nav title="Dashboard" />
    <div class="row mt-4">
      <div class="col">
        <div class="card border-dark mx-auto text-center" style="width: 15rem">
          <div class="card-body">
            <h5 class="card-title">Ciro</h5>
            <p class="card-text">
              {{ ciro }}
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-dark mx-auto text-center" style="width: 15rem">
          <div class="card-body">
            <h5 class="card-title">Ürün Adedi</h5>
            <p class="card-text">
              {{ ciro }}
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-dark mx-auto text-center" style="width: 15rem">
          <div class="card-body">
            <h5 class="card-title">Müşteri Adedi</h5>
            <p class="card-text">
              {{ ciro }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">Line chart(Aylara Göre Satış)</div>
    </div>
    <div class="row"><div class="col">Pie Chart(Ürüne göre satış)</div></div>
  </div>
</template>

<script>
import FixNav from "../Shared/FixNav.vue";
export default {
  name: "Home",
  components: { FixNav },
  data() {
    return {
      ciro: "456465",
    };
  },
};
</script>
