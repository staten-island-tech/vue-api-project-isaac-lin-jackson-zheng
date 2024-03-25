<template>
  <div id="header">
    <h1>New York City Tax Revenue</h1>
  </div>
  <nav>
    <RouterLink to="/" class="link">Bar Graph</RouterLink>
    <RouterLink to="/doughnut" class="link">Doughnut Chart</RouterLink>
  </nav>
  <RouterView/>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'

const taxes = ref('')

async function getData() {
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
  getData()
})
</script>

<style scoped>
#header {
  margin: 2vw 0px 2vw 0px;
  padding: 2vw;
  display: flex;
  justify-content: center;
  color: white;
  background-color: #003884;
  border: solid #ff6600 thick;
  border-left-style: none; border-right-style: none;
}
nav {
  display: flex;
  margin-bottom: 2vw;
  gap: 10vw;
  flex-direction: row;
  justify-content: center;
}
.link {
  padding: 12px;
  background-color: #003884;
  border-radius: 3px;
  color: white;
  font-size: larger;
  text-decoration: none;
}
</style>