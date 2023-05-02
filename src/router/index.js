import Vue from 'vue'
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts'
import ក្រាប from '../views/ក្រាប.vue'
import តារាងកម្រិតទឹកសមុទ្រ from '../views/តារាងកម្រិតទឹកសមុទ្រ.vue'
import តារាងអ្នកប្រើប្រាស់ from '../views/តារាងអ្នកប្រើប្រាស់.vue'
import ផែនទី from '../views/ផែនទី.vue'
Vue.use(VueRouter)
Vue.component('apexchart', VueApexCharts)
const routes = [
 
  {
    path: '/ក្រាប',
    name: 'ក្រាប',
    component:ក្រាប
  },
  {
    path: '/ផែនទី',
    name: 'ផែនទី',
    component:ផែនទី
  },
  {
    path: '/តារាងកម្រិតទឹកសមុទ្រ',
    name: 'តារាងកម្រិតទឹកសមុទ្រ',
    component: តារាងកម្រិតទឹកសមុទ្រ
  },
  {
    path: '/តារាងអ្នកប្រើប្រាស់',
    name: 'តារាងអ្នកប្រើប្រាស់',
    component: តារាងអ្នកប្រើប្រាស់
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
