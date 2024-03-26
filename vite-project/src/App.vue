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