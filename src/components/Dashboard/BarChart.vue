<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: ["2015-01", "2015-01", "2015-01", "2015-01", "2015-01"],
        datasets: [
          {
            label: "Bar Chart",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: [10, 1, 1, 1, 1, 1],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    console.log(this.$store.getters.getSales);
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    getMonth() {
      // //Get the currentYear and the currentMonth
      // (currentMonth = new Date().getMonth() + 1),
      //   (currentYear = new Date().getFullYear()),
      //   //Get the year and month from the iterated date
      //   (let[(year, month)] = e.date.split("-"));
      // //Then filter the dates
      // events = array.filter((e) => {
      //   var [year, month] = e.date.split("-"); // Or, var month = e.date.split('-')[1];
      //   return currentMonth === +month && currentYear == year;
      // });
    },
  },
};
</script>
