<template>
  <div>
    <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="/boxlist">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center font-weight-bolder">Caixa</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-spacer class="mt-5"></v-spacer>
    <v-app class="container">
      <h5 class="border-bottom border-warning pb-2 w-50">Relátorio</h5>
      <div class="card mb-1 p-2 mt-2">
        <div class="d-flex justify-content-between text-primary">
          <span class>
            <span class="font-weight-bold">Recebimentos</span>
          </span>
          <div>
            <span class="font-weight-bold">R$ {{boxDetails.receiveds}}</span>
          </div>
        </div>
      </div>
      <div class="card mb-1 p-2 mt-2">
        <div class="d-flex justify-content-between text-primary">
          <span class>
            <span class="font-weight-bold">Recebimentos</span>
          </span>
          <div>
            <span class="font-weight-bold">R$ {{boxDetails.receiveds}}</span>
          </div>
        </div>
      </div>
      <div class="card mb-1 p-2 mt-2">
        <div class="d-flex justify-content-between text-primary">
          <span class>
            <span class="font-weight-bold">Outras entradas</span>
          </span>
          <div>
            <span class="font-weight-bold">R$ {{boxDetails.inputs}}</span>
          </div>
        </div>
      </div>
      <div class="card mb-1 p-2 mt-2">
        <div class="d-flex justify-content-between text-pr imary">
          <span class>
            <span class="font-weight-bold">Outras saídas</span>
          </span>
          <div>
            <span class="font-weight-bold">R$ {{boxDetails.outputs}}</span>
          </div>
        </div>
      </div>
      <div class="card mb-1 p-2 mt-2 bg-primary">
        <div class="d-flex justify-content-between text-white">
          <span class>
            <v-icon class="text-white mr-2">mdi-coin</v-icon>
            <span class="font-weight-bold">Saldo do dia</span>
          </span>
          <div>
            <span class="font-weight-bold">R$ {{boxDetails.valueTotal}}</span>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <h5 class="border-bottom border-warning pb-2 w-50">Parcelas Recebidas</h5>
      <div id="resp"></div>
      <div v-for="parcel in receivedsBox" :key="parcel.recinId">
        <v-card
          tag="router-link"
          :to="'/parceldetails/' + parcel.installmentId"
          class="card mb-1 p-2 mt-2 text-decoration-none"
        >
          <div class="d-flex justify-content-between">
            <span class="text-primary">
              <b>{{parcel.recinId}}</b>
            </span>
            <div>
              <span class="text-primary font-weight-bold">{{parcel.recinDate}}</span>
            </div>
            <div>
              <span class="text-primary font-weight-bold">R$ {{parcel.recinValue}}</span>
            </div>
          </div>
        </v-card>
      </div>
    </v-app>
  </div>
</template>
<script>
import vars from '../plugins/env.local'
export default {
  mounted: function () {
    this.getBoxValues()
  },
  data: () => ({
    boxDetails: "",
    receivedsBox: "",
  }),
  methods: {
    getBoxValues() {
      const url = `${vars.host}boxController.php`
      let formData = new FormData()
      formData.append('box-details', 'true')
      formData.append('box-id', this.$route.params.boxid)
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        this.boxDetails = json
        // document.getElementById('resp').innerHTML = json
        console.log(json)
        this.receivedsBox = json.installments
      })
    },
  }
}
</script>

<style>
</style>