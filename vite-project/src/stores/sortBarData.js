import Chart from 'chart.js/auto'
import { ref } from 'vue'

const taxes = ref([])
let chart = null

export async function sortData() {
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

  const tax = data.filter(data => data.year >= 2010 && data.year <= 2021)

  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById('taxbar')
  if (ctx) {
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: tax.map(row => row.year),
        datasets: [{
          label: 'Total Revenue',
          data: tax.map(row => row.total_taxes),
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true,
            reverse: true
          }
        }
      }
    })
  }
}