<template>
  <div id="graph">
    <h1>THE IRS</h1>
    <canvas id="taxbar"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'

const taxes = ref('')

async function getdatas() {
  let response = await fetch('https://data.cityofnewyork.us/resource/hdnu-nbrh.json')
  let data = await response.json()
  taxes.value = data
  console.log(data)

  function stringWithCommas() {
  let stringWithCommas = row.total_taxes;
let stringWithoutCommas = stringWithCommas.replace(',', '');
console.log(stringWithoutCommas); 
  }
stringWithCommas.log

const tax = data.filter((data) => data.year > 2000 )

  const ctx = document.getElementById('taxbar')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tax.map((row) => row.year),
      datasets: [
        {
          label: 'Total Tax',
          data: tax.map((row) => row.year),
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}
onMounted(() => {
  getdatas()
})
</script>

<style scoped>
#graph {
  background-color: white;
}
</style>
