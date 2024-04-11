<template>
  <div class="holder">
    <div>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/bar">Number of usasges in years</router-link>
    </div>
  </div>
  <div>
    
  </div>
  <router-view></router-view>
  
</template>



<style scoped>
.holder {
  margin: auto;
  max-width: 500px;
  padding: 1rem 0;
}
.link {
  margin: 0 1rem;
  font-size: large;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
</style>