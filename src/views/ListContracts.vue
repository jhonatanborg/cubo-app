<template>
  <v-app>
    <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="/home">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center font-weight-bolder">Contratos</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <div class="container mt-5">
      <h5 class="border-bottom border-warning pb-2 w-50">Contratos</h5>
      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Selecione o mês"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker locale="pt-BR" v-model="date" type="month" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="saveDate(date, $refs.dialog)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <div id="resp"></div>
      <div v-for="contract in listContracts" :key="contract.id">
        <v-card
          tag="router-link"
          :to="'/contractdetails/' + contract.id"
          class="card mb-1 p-2 mt-2 text-decoration-none"
        >
          <div class="d-flex justify-content-between text-primary">
            <span class>
              <v-icon class="text-primary mr-2">mdi-folder-lock-open</v-icon>
              <span class="font-weight-bold">{{contract.company.name}}</span>
            </span>
            <div>
              <span class="font-weight-bold">{{contract.dateOpen}}</span>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>

import vars from '../plugins/env.local'
const url = `${vars.host}contractController.php`

export default {
  mounted: function () {
    this.getContractsDay()
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    menu2: false,
    boxId: 20,
    listContracts: []
  }),
  methods: {
    saveDate(date, dialog) {
      console.log(this.date)
      this.getContractsDay(this.date)
      this.modal = false
      dialog.save(this.date)
    },
    getContractsDay(date = this.date) {
      let form = new FormData()
      form.append('get-contracts', 'true')
      form.append('date', date)
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        let contracts = []
        json.forEach(contract => {
          contracts.push(contract)
        })
        this.listContracts = contracts
        console.log(this.listContracts)
        // document.getElementById('resp').innerHTML = json

        
      })
    }
  },
}

</script>

<style>
</style>