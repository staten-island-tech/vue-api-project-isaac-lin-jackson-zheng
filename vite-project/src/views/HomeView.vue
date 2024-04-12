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

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "BarChart",
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
 
  methods: {
    async getData() {
      try {
        const selected = this.selected
        let response = await fetch('https://data.cityofnewyork.us/resource/hdnu-nbrh.json')
        let rawData = await response.json()
        taxes.value = rawData

        const convert = string => parseInt(string.replace(/,/g, ''), 10);
        const array = rawData.map(object => ({
          ...object,
          year: convert(object.year),
          total_taxes: convert(object.total_taxes),
          commercial_rent: convert(object.commercial_rent),
          conveyance_of_real_property: convert(object.conveyance_of_real_property),
          financial_corporation: convert(object.financial_corporation),
          general_corporation: convert(object.general_corporation),
          general_sales: convert(object.general_sales),
          mortgage_recording: convert(object.mortgage_recording),
          other_taxes: convert(object.other_taxes),
          personal_income_general_fund_revenue: convert(object.personal_income_general_fund_revenue),
          personal_income_total: convert(object.personal_income_total),
          property: convert(object.property),
          unincorporated_business_income: convert(object.unincorporated_business_income),
        }));
        const data = array.reverse()

        function displayData() {
          const ctx = document.getElementById('chart')
          if (ctx.children.length === 0) {
            const tax = data.filter(data => data.year >= 2010 && data.year <= 2020)
            return tax
          } else if (ctx.children.length >= 1) {
            const tax = data.filter(data => data.year >= selected.min && data.year <= selected.max)
            return tax
          }
        }
        const tax = displayData();
        console.log(tax)

        this.chartData = {
          labels: tax.map(column => column.year),
          datasets: [
            {
              label: "Total Revenue",
              backgroundColor: ["#a0d0f3"],
              data: tax.map(column => column.total_taxes)
            },
          ],
        };
        this.load = true;
      } 
      catch (e) {
        console.log(e);
      }
    },
  },
  name: "BarChart",
  components: { Bar },
  props: {},
  async mounted() {
    this.getData()
  },
}
</script>

<style scoped>
  label {
    margin-bottom: 2vw;
    font-size: larger;
  }
  select {
    margin-bottom: 2vw;
    padding: 3px;
    font-size: larger;
  }
</style>