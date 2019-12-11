<template>
  <v-app class="bg-app">
    <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="/listcontracts">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center font-weight-bolder">Contrato</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <div class="container">
      <h5 class="border-bottom border-warning pb-2 w-50">Dados da empresa</h5>
      <div v-for="item in contract" :key="item.id">
        <v-card class="p-2">
          <h5 class="text-muted">Empresa</h5>
          <h5 class="text-primary">
            <b>{{item.company.name}}</b>
          </h5>
          <h5 class="text-muted">Responsável</h5>
          <h5 class="text-primary">
            <b>{{item.company.owner_id.name}}</b>
          </h5>
        </v-card>
        <div class="card mb-1 p-2 mt-2" :class="background">
          <div class="d-flex justify-content-between text-white">
            <span class>
              <v-icon class="text-white mr-2">mdi-coin</v-icon>
              <span class="font-weight-bold">Status</span>
            </span>
            <div>
              <span class="font-weight-bold">{{statusContrato}}</span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <v-btn color="purple" class="mb-4" block dark @click="dialog = true">Mensalidades</v-btn>
        </div>
        <h5 class="border-bottom border-warning pb-2 mt-4 w-50">Plano</h5>
        <v-card class="card-n p-2">
          <h5 class="text-muted">Valor do plano</h5>
          <h5 class="text-primary">
            <b>R$ {{item.plan[0].value}}</b>
          </h5>
          <h5 class="text-muted">Nº de parcelas</h5>
          <h5 class="text-primary">
            <b>{{quantity}} parcelas</b>
          </h5>
        </v-card>
        <v-bottom-sheet v-if="statusContrato != 'FECHADO'" v-model="CancelView">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="red" block class="mt-5">Cancelar Contrato</v-btn>
          </template>
          <v-sheet height="250px">
            <!-- <v-btn class="mt-6" color="error" @click="sheet = !sheet">close</v-btn> -->
            <div class="container">
              <div class="container">
                <h4>
                  Cancelar contrado de
                  <b>{{item.company.name}}</b>
                </h4>
              </div>
              <v-btn block color="red" class="mt-5" @click="CancelView = false">Não</v-btn>
              <v-btn block color="primary" class="mt-4" @click=" CancelContract()">Sim</v-btn>
            </div>
          </v-sheet>
        </v-bottom-sheet>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          class="bg-app"
        >
          <v-card tile>
            <v-toolbar class="bg-primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-white text-center">Mensalidades</v-toolbar-title>
            </v-toolbar>
            <div class="container bg-app mt-4">
              <div v-for="item in installments" :key="item.id">
                <div class="card mb-1 p-2">
                  <div class="d-flex justify-content-between">
                    <span class="text-primary">
                      <b>{{ item.number }}x {{ item[0]}}</b>
                    </span>

                    <span class="text-primary">
                      <b>{{ item.date }}</b>
                    </span>
                    <span class="text-primary">
                      <b>{{ item.value }}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>
<script>
import vars from '../plugins/env.local'
import { log } from 'util'
const url = `${vars.host}contractController.php`

export default {

  mounted: function () {
    this.getContract()
  },
  data: () => ({
    dialog: false,
    CancelView: false,
    contract: "",
    installments: "",
    quantity: "",
    idContrato: "",
    statusContrato: "",
    background: "",
  }),
  methods: {
    getContract() {
      let form = new FormData()
      form.append('get-contract', 'true')
      form.append('contract-id', this.$route.params.contractid)
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        this.installments = json[0].installments
        this.contract = json
        this.quantity = this.installments.length
        this.idContrato = json[0].id
        this.statusContrato = json[0].status
        console.log(json[0].id)
        switch (this.statusContrato) {
          case "CANCELADO":
            this.background = "bg-danger"
            break;
          case "ABERTO":
            this.background = "bg-primary"
            break;
          default:
            this.background = "bg-success"
            break;
        }
      })
    },
    CancelContract() {
      let form = new FormData()
      form.append('alter-contract', 'true')
      form.append('contract-id', this.$route.params.contractid)
      form.append('contract-status', 'CANCELADO')
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        console.log(json)

        switch (this.statusContrato) {
          case "CANCELADO":
            this.background = "bg-danger"
            break;
          case "ABERTO":
            this.background = "bg-primary"
            break;
          default:
            this.background = "bg-success"
            break;
        }
      })
    }
  }
}
</script>

<style>
</style>