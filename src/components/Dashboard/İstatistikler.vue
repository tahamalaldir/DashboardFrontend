<template>
  <v-row class="mt-2">
    <v-col class="mx-auto" cols="2">
      <v-card class="text-center" color="#0D7377" dark>
        <h4 class="pa-4">Ciro</h4>
        <h5 class="pa-4 pt-0">{{ ciro }}</h5>
      </v-card>
    </v-col>
    <v-col class="mx-auto" cols="2">
      <v-card class="text-center" color="#F0A500" dark>
        <h4 class="pa-4">Ürün Adedi</h4>
        <h5 class="pa-4 pt-0">{{ product.length }}</h5>
      </v-card>
    </v-col>
    <v-col class="mx-auto" cols="2">
      <v-card class="text-center" color="#6D9886" dark>
        <h4 class="pa-4">Müşteri Adedi</h4>
        <h5 class="pa-4 pt-0">{{ customer.length }}</h5>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      ciro: "456465",
      urunAdedi: "456465",
      musteriAdedi: "456465",
    };
  },
  computed: {
    product: {
      get() {
        return this.$store.getters.getProducts;
      },
    },
    customer: {
      get() {
        return this.$store.getters.getCustomers;
      },
    },
  },
};
</script>

<style></style>
