import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/installments',
    name: 'installments',
    component: () => import('../views/Installments.vue')
  },
  {
    path: '/newcompany',
    name: 'newcompany',
    component: () => import('../views/NewCompany.vue')
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/newloan',
    name: 'newloan',
    component: () => import('../views/NewLoan.vue')
  },
  {
    path: '/responsible',
    name: 'responsible',
    component: () => import('../views/Responsible.vue')
  },
  {
    path: '/plans',
    name: 'plans',
    component: () => import('../views/Plans.vue')
  },
 
  {
    path: '/plansdetails/:id',
    name: 'plansdetails',
    component: () => import('../views/PlansDetails.vue')
  },
  {
    path: '/newcontracts/:id',
    name: 'newcontracts',
    component: () => import('../views/NewContracts.vue')
  },
  {
    path: '/confirmcontract',
    name: 'confirmcontract',
    component: () => import('../views/ConfirmContract.vue')
  },
  {
    path: '/inputs',
    name: 'inputs',
    component: () => import('../views/Inputs.vue')
  },
  {
    path: '/exits',
    name: 'exits',
    component: () => import('../views/Exits.vue')
  },
  {
    path: '/parcelreceive/:id',
    name: 'parcelreceive',
    component: () => import('../views/ParcelReceive.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/boxlist',
    name: 'boxlist',
    component: () => import('../views/BoxList.vue')
  },
  {
  path: '/boxdetails/:boxid',
  name: 'boxdetails',
  component: () => import('../views/BoxDetails.vue')
},
{
  path: '/parceldetails/:parcelid',
  name: 'parceldetails',
  component: () => import('../views/ParcelDetails.vue')
},
{
  path: '/userdetails/:userid',
  name: 'userdetails',
  component: () => import('../views/UserDetails.vue')
},
{
  path: '/listcontracts',
  name: 'listcontracts',
  component: () => import('../views/ListContracts.vue')
},
{
  path: '/contractdetails/:contractid',
  name: 'contractdetails',
  component: () => import('../views/ContractDetails.vue')
},
{
  path: '/clientedit/:id',
  name: 'clientedit',
  component: () => import('../views/ClientEdit.vue')
},
{
  path: '/registerclient',
  name: 'registerclient',
  component: () => import('../views/RegisterClient.vue')
},
{
  path: '/report',
  name: 'report',
  component: () => import('../views/Report.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
