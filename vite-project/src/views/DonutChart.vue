<template>
  <label for="time-period"></label>
  <select name="time-period" id="select-time">
    <option min="2009" max="2020">2010s</option>
    <option min="1999" max="2010">2000s</option>
    <option min="1989" max="2000">1990s</option>
    <option min="1979" max="1990">1980s</option>
  </select>
  <div id="graph">
    <canvas id="taxbar"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'

const taxes = ref('')

async function getData() {
  let response = await fetch('https://data.cityofnewyork.us/resource/hdnu-nbrh.json')
  let rawData = await response.json()
  taxes.value = rawData
  // console.log(rawData)

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
  console.log(data);

  let minimum = 2009
  let maximum = 2020
  document.getElementById("select-time").addEventListener("change", function() {
    const selectedOption = this.options[this.selectedIndex];
    minimum = selectedOption.getAttribute("min");
    maximum = selectedOption.getAttribute("max");
    console.log(minimum)
    console.log(maximum)
  });
  
  const tax = data.filter((data) => data.year > minimum && data.year < maximum)
  const ctx = document.getElementById('taxbar')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: tax.map((row) => row.year),
      datasets: [
        {
          label: 'Total Revenue',
          data: tax.map((row) => row.total_taxes),
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'x',
      scales: {
        x: {
          beginAtZero: true,
          reverse: true,
        }
      }
    }
  })
}
onMounted(() => {
  getData()
})
</script>

<style scoped>

</style>