<template>
  <label for="year">Select a year: </label>
  <select name="year" id="select-year" v-model="selected" @change="getData()">
    <option value="2020">2020</option>
    <option value="2019">2019</option>
    <option value="2018">2018</option>
    <option value="2017">2017</option>
    <option value="2016">2016</option>
    <option value="2015">2015</option>
    <option value="2014">2014</option>
    <option value="2013">2013</option>
    <option value="2012">2012</option>
    <option value="2011">2011</option>
    <option value="2010">2010</option>
    <option value="2009">2009</option>
    <option value="2008">2008</option>
    <option value="2007">2007</option>
    <option value="2006">2006</option>
    <option value="2005">2005</option>
    <option value="2004">2004</option>
    <option value="2003">2003</option>
    <option value="2002">2002</option>
    <option value="2001">2001</option>
    <option value="2000">2000</option>
    <option value="1999">1999</option>
    <option value="1998">1998</option>
    <option value="1997">1997</option>
    <option value="1996">1996</option>
    <option value="1995">1995</option>
    <option value="1994">1994</option>
    <option value="1993">1993</option>
    <option value="1992">1992</option>
    <option value="1991">1991</option>
    <option value="1990">1990</option>
    <option value="1989">1989</option>
    <option value="1988">1988</option>
    <option value="1987">1987</option>
    <option value="1986">1986</option>
    <option value="1985">1985</option>
    <option value="1984">1984</option>
    <option value="1983">1983</option>
    <option value="1982">1982</option>
    <option value="1981">1981</option>
    <option value="1980">1980</option>
  </select>
  <div id="chart">
    <Pie
      v-if="load"
      id="revenue-sources"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Colors, ArcElement, Tooltip, Legend } from "chart.js";
import { ref } from "vue";

ChartJS.register(ArcElement, Colors, Tooltip, Legend);

let selected = ref('')
const taxes = ref('')

export default {
  data() {
    return {
      selected: '',
      year: '',
      taxes: '',
      load: false,
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Sources in 2020',
          },
          colors: {
            forceOverride: true,
          },
        },
        maintainAspectRatio: false,
        aspectRatio: 0.5,
      },
    };
  },
  watch: {
    selected(year) {
      this.chartOptions.plugins.title.text = `Revenue Sources in ${year}`;
    },
  },
  methods: {
    async getData() {
      try {
        const selected = this.selected
        let response = await fetch('https://data.cityofnewyork.us/resource/hdnu-nbrh.json')
        let rawData = await response.json()
        taxes.value = rawData

        const convert = string => parseInt(string.replace(/,/g, ''), 10);
        const data = rawData.map(object => ({
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

        function displayData() {
          const ctx = document.getElementById('chart')
          const year = parseInt(selected)
          function viewYear(year) {
            return data.find(object => object.year === year)
          }
          let revenueSources = []
          let dataArray = []
          if (ctx.children.length === 0) {
            const annualData = viewYear(2020)
            console.log(annualData)
            for (let property in annualData) {
              if (property !== 'year' && property !== 'total_taxes' && property !== 'less_transfers_to_debt_service_funds_and_adjustments') {
                dataArray.push(annualData[property])
                revenueSources.push(property.replace(/_/g, ' '))
              }
            }
            return [revenueSources, dataArray]
          } else if (ctx.children.length >= 1) {
            const annualData = viewYear(year)
            console.log(annualData)
            for (let property in annualData) {
              if (property !== 'year' && property !== 'total_taxes' && property !== 'less_transfers_to_debt_service_funds_and_adjustments') {
                dataArray.push(annualData[property])
                revenueSources.push(property.replace(/_/g, ' '))
              }
            }
            return [revenueSources, dataArray]
          }
        }
        const preparedData = displayData();
        const revenueSources = preparedData[0]
        const dataArray = preparedData[1]

        this.chartData = {
          labels: revenueSources,
          datasets: [
            {
              label: "Revenue",
              backgroundColor: ["#FF0000"],
              data: dataArray,
            },
          ],
        };
        this.load = true;
      } catch (e) {
        console.log(e);
      }
    }
  },
  name: "PieChart",
  components: { Pie },
  props: {},
  async mounted() {
    this.getData()
  },
};
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