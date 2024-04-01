<template>
  <div id="header">
    <h1>New York City Tax Revenue</h1>
  </div>
  <nav>
    <RouterLink to="/" class="link">Total Revenues</RouterLink>
    <RouterLink to="/pie" class="link">Revenue Sources</RouterLink>
    <RouterLink to="/game" class="link">game</RouterLink>
  </nav>
  <div id="data">
    <RouterView/>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
  #header {
    margin: 1vw 0px 2vw 0px;
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
  #data {
    margin: auto;
    padding-bottom: 2vw;
    width: 75%;
  }
</style>