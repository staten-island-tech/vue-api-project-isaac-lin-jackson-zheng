<template>
  <div>

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  const taxes = ref('')
  async function getData() {
    let res = await fetch('https://data.cityofnewyork.us/resource/hdnu-nbrh.json')
    let data = await res.json()
    console.log(data)
    taxes.value = data
  };
  onMounted(() => {
    getData(taxes)
  });
</script>

<style scoped>

</style>