<template>
  <v-row>
    <istatistikler />
    <v-col class="mx-auto mt-15" cols="8"> <bar-chart /> </v-col
    ><v-col class="mx-auto mt-15" cols="8">
      <pie-chart />
    </v-col>
  </v-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import PieChart from "./PieChart.vue";
import istatistikler from "./İstatistikler.vue";
export default {
  name: "Dashboard",
  components: { istatistikler, BarChart, PieChart },
};
</script>
