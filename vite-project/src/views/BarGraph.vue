<template>
  <div id="graph">
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

  const tax = data

  const ctx = document.getElementById('taxbar')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tax.map((row) => row.nm),
      datasets: [
        {
          label: 'year',
          data: tax.map((row) => row.cnt),
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
  #toggle-data {
    margin-bottom: 2vw;
    padding: 10px;
    background-color: #003884;
    border-radius: 3px;
    border-style: none;
    color: white;
    font-family: "Arimo", sans-serif;
    font-size: large;
    cursor: pointer;
  }
  #graph {
    background-color: white;
  }
</style>