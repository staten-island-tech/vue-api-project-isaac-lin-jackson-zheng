<template>
  <label for="time-period">Time Period: </label>
  <select name="time-period" id="select-time" v-model="selected" @change="getData()">
    <option v-for="option in options" :value="option.value">{{ option.year }}</option>
  </select>

  <div id="graph">
    <canvas id="taxbar"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'
import { sortData } from '../stores/sortBarData.js'

const options = ref([
  { year: '2010s', value: { min: 2010, max: 2021 } },
  { year: '2000s', value: { min: 2000, max: 2010 } },
  { year: '1990s', value: { min: 1990, max: 2000 } },
  { year: '1980s', value: { min: 1979, max: 1990 } },
])
let selected = ref('')
const taxes = ref([])
let chart = null

async function getData() {
  console.log(options)
  
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

  // const decade = options.value.find(option => option.value.min === selected.value.min && option.value.max === selected.value.max)
  // const tax = data.filter(data => data.year >= decade.value.min && data.year <= decade.value.max)

  function displayData() {
    if (selected === undefined) {
      const tax = data.filter(data => data.year >= 2010 && data.year <= 2020)
      return tax
    } else if (selected.selectedIndex !== -1) {
      const decade = options.value.find(option => option.value.min === selected.value.min && option.value.max === selected.value.max)
      const tax = data.filter(data => data.year >= decade.value.min && data.year <= decade.value.max)
      return tax
    }
  }
  const tax = displayData()
  console.log(tax)
  console.log(selected)

  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById('taxbar')
  if (ctx) {
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: tax.map(row => row.year),
        datasets: [{
          label: 'Total Revenue',
          data: tax.map(row => row.total_taxes),
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true,
            reverse: true
          }
        }
      }
    })
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped>

</style>