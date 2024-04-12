<script setup></script>

<template>
  <div class="chart">
    <Doughnut
      v-if="load"
      id="my-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>
<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ref, reactive } from "vue";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "BarChart", // renaming it crashes the page lol
  components: { Doughnut },
  props: {},
  data() {
    return {
      load: false,
      chartData: null,
      chartOptions: {
        responsive: true,
      },
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        "https://data.cityofnewyork.us/resource/hdnu-nbrh.json"
      );
      const years = await response.json();
      const filtered = years.filter((x) => {
        return x.year !== undefined;
      });
      const year1 = filtered.filter((e) => {
        return e.year.includes(1);
      });
      const year2 = filtered.filter((e) => {
        return e.year.includes(2);
      });
      const year3 = filtered.filter((e) => {
        return e.year.includes(3);
      });
      const year4 = filtered.filter((e) => {
        return e.year.includes(4);
      });
      const year5 = filtered.filter((e) => {
        return e.year.includes(50);
      });


      this.chartData = {
        labels: ["1", "2", "3", "4", "5",],
        datasets: [
          {
            label: "Number of uses of number",
            backgroundColor: ["#FF0000"],
            data: [
              year1.length,
              year2.length,
              year3.length,
              year4.length,
              year5.length,

            ],
          },
        ],
      };
      this.load = true;
      console.log(this.load);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.present {
  height: 20rem;
  width: 20rem;
  border: solid black 1rem;
}
.chart {
  background: white;
  height: 30rem;
  width: 30rem;
  border: solid white 1rem;
  border-radius: 2rem;
}
.chart {
  margin: auto;
  align-items: center;
}
</style>