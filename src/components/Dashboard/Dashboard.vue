<template>
  <v-row>
    <istatistikler />
    <v-col class="mx-auto mt-5" cols="8">
      <bar-chart />
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import istatistikler from "./İstatistikler.vue";
export default {
  name: "Dashboard",
  components: { istatistikler, BarChart },
};
</script>
