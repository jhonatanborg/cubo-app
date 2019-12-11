<template>
  <v-app class="bg-app">
   <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="/boxlist">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center font-weight-bolder">Parcela</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <div id="resp"></div>
    <div class="container mt-2">
      <div v-for="dados  in installment" :key="dados.id">
        <h5 class="border-bottom border-warning pb-2 w-50">Dados da empresa</h5>
        <div class="card-n p-2">
          <h5 class="text-muted">Empresa</h5>
          <h5 class="text-primary">
            <h1 v-for="hp  in historicP" :key="hp.id">{{hp.amount}}</h1>
            <b>{{dados.company.name}}</b>
          </h5>
          <h5 class="text-muted">Responsável</h5>
          <h5 class="text-primary">
            <b>{{dados.company.owner_id.name}}</b>
          </h5>
        </div>
        <h5 class="border-bottom border-warning pb-2 mt-4 w-50">Dados da parcela</h5>
        <div class="card p-3" :class="background">
          <div class="d-flex justify-content-bettwen align-items-center">
            <v-icon large>{{icon}}</v-icon>
            <v-divider class="mr-2" vertical></v-divider>
            <div class="font-weight-bold mr-auto">
              <h6 class>Valor da parcela</h6>
              <span>R$</span>
              <span id="valueT">{{dados.value}}</span>
            </div>
            <div class="font-weight-bold">
              <h6>Vencimento</h6>
              <span class>{{dados.date}}</span>
            </div>
          </div>
        </div>
        <div class="card mb-1 p-2 mt-2 bg-primary">
          <div class="d-flex justify-content-between text-white">
            <span class>
              <v-icon class="text-white mr-2">mdi-coin</v-icon>
              <span class="font-weight-bold">Restante</span>
            </span>
            <div>
              <span class="font-weight-bold">R$ {{remaing}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h5 class="border-bottom border-warning pb-2 mt-4 w-50">Historico de cobrança</h5>
        <div class="card-n p-3 mt-2" v-for="item  in historic" :key="item.id">
          <div class="d-flex justify-content-between">
            <div>
              <v-icon small class="pr-1">mdi-calendar-remove</v-icon>
              <small class="text-primary">
                <b>{{item.details}}</b>
              </small>
            </div>
            <div>
              <small class="text-primary mr-3">
                <b>{{item.date}}</b>
              </small>
              <small class="text-primary">
                <b>R$ {{item.amount}}</b>
              </small>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </v-app>
</template>
<script>
import vars from '../plugins/env.local'
export default {
  mounted: function () {
    this.getInstallment()
  },
  data: () => ({
    historicP: '',
    multiLine: true,
    snackbar: false,
    text: 'Valor recebido com sucesso',
    Rview: false,
    installment: '',
    historic: [],
    dialog: false,
    Nview: false,
    reasonSelected: 'null',
    receiveValue: ' ',
    background: '',
    icon: '',
    receive: '',
    remaing: '',
  }),
  methods: {
    getInstallment() {
      const url = `${vars.host}parcelController.php`
      let formData = new FormData()
      formData.append('parcelinfo', 'true')
      formData.append('parcel-id', this.$route.params.parcelid)
      // localStorage.setItem('parcel-id', this.$route.params.parcelid)
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        console.log(json)
        // document.getElementById('resp').innerHTML = json
        this.installment = json
        let array = []
        json.forEach(item => {
          if (item.historic)
            array.push(JSON.parse(item.historic))
        })
        array.forEach((item, key) => {
          this.historic = item
        })
        let status = (json[0].status)
        this.remaing = (json[0].remaing)

        console.log(status)
        switch (status) {
          case 'PENDENTE':
            this.background = "bg-warning",
              this.icon = "mdi mdi-information-outline text-dark"
            this.receive = 1
            break;
          case 'COBRADO':
            this.background = 'bg-danger text-white'
            this.icon = "mdi mdi-close-circle-outline text-white"
            this.receive = 2
            break;
          case 'RECEBIDA':
            this.background = 'bg-primary text-white'
            this.icon = "mdi mdi-checkbox-marked-circle-outline text-white"
            this.receive = 3
            break;
          default:
            break;
        }
      })
    },
  }
}
</script>

<style>
</style>