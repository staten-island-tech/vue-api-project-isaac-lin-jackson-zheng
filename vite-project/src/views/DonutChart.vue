<template>
  <label for="time-period"></label>
  <select name="time-period" id="select-time">
    <option value="">2021</option>
    <option value="">2020</option>
    <option value="">2019</option>
    <option value="">2018</option>
    <option value="">2017</option>
    <option value="">2016</option>
    <option value="">2015</option>
    <option value="">2014</option>
    <option value="">2013</option>
    <option value="">2012</option>
    <option value="">2011</option>
    <option value="">2010</option>
    <option value="">2009</option>
    <option value="">2008</option>
    <option value="">2007</option>
    <option value="">2006</option>
    <option value="">2005</option>
    <option value="">2004</option>
    <option value="">2003</option>
    <option value="">2002</option>
    <option value="">2001</option>
    <option value="">2000</option>
    <option value="">1999</option>
    <option value="">1998</option>
    <option value="">1997</option>
    <option value="">1996</option>
    <option value="">1995</option>
    <option value="">1994</option>
    <option value="">1993</option>
    <option value="">1992</option>
    <option value="">1991</option>
    <option value="">1990</option>
    <option value="">1989</option>
    <option value="">1988</option>
    <option value="">1987</option>
    <option value="">1986</option>
    <option value="">1985</option>
    <option value="">1984</option>
    <option value="">1983</option>
    <option value="">1982</option>
    <option value="">1981</option>
    <option value="">1980</option>
  </select>
  <div id="graph">
    <canvas id="tax-wheel"></canvas>
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
  const ctx = document.getElementById('tax-wheel')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: tax.map((row) => row.property),
      datasets: [
        {
          label: 'property Revenue',
          data: tax.map((row) => row.year),
          borderWidth: 1
        }
      ]
    },
  })
}
onMounted(() => {
  getData()
})
</script>

<style scoped>

</style>