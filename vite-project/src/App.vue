<template>
  <div id="header">
    <h1>New York City Tax Revenue</h1>
  </div>

  <!-- Start of vue component -->

  <button id="toggle-data">Change to pie chart</button>
  <div id="graph">
    <canvas id="taxbar"></canvas>
  </div>

  <!-- End of vue component -->
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
#header {
  margin: 2vw 0px 2vw 0px;
  padding: 2vw;
  display: flex;
  justify-content: center;
  color: white;
  font-family: "Arimo", sans-serif;
  background-color: #003884;
  border: solid #ff6600 thick;
  border-left-style: none; border-right-style: none;
}

/* CSS beyond this point is for testing */

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