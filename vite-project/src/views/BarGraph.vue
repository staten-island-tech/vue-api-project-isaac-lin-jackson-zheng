<template>
  <label for="time-period">Select a decade: </label>
  <select name="time-period" id="select-time" v-model="selected" @change="getData()">
    <option v-for="option in options" :value="option.value">{{ option.year }}</option>
  </select>

  <div id="chart">
    <Bar
      v-if="load"
      id="annual-revenue"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let selected = ref('')
const taxes = ref([])

export default {
  data() {
    return {
      options: [
        { year: '2010s', value: { min: 2010, max: 2020 } },
        { year: '2000s', value: { min: 2000, max: 2010 } },
        { year: '1990s', value: { min: 1990, max: 2000 } },
        { year: '1980s', value: { min: 1980, max: 1990 } },
      ],
      selected: '',
      taxes: [],
      load: false,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
      },
    }
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
  name: "BarGraph",
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