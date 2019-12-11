<template>
  <v-app>
    <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="home">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center font-weight-bolder">Caixas</v-toolbar-title>
    </v-toolbar>
    <v-app>
      <div class="container">
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <h5 class="border-bottom border-warning pb-2 mt-4 w-50">Pesquisar caixas</h5>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent>
          <template v-slot:activator="{ on }">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="date"
              solo
              label="Picker in dialog"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker full-width locale="pt-BR" v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="day($refs.dialog)">OK</v-btn>
            
          </v-date-picker>
        </v-dialog>
        <div class="mx-auto w-50 mt-4 mb-4">
          <h5 class="border-bottom border-warning text-center"></h5>
        </div>
        <div v-for="item in BoxList" :key="item.BoxId">
          <v-card
            tag="router-link"
            :to="'/boxdetails/' + item.boxId"
            class="card mb-1 p-2 mt-2 text-decoration-none"
          >
            <div class="d-flex justify-content-between text-primary">
              <span class>
                <v-icon class="text-primary mr-2">mdi-folder-lock-open</v-icon>
                <span class="font-weight-bold">{{item.userInfo[0].name}}</span>
              </span>
              <div>
                <span class="font-weight-bold">{{item.openDate}}</span>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </v-app>
  </v-app>
</template>
<script>
import vars from '../plugins/env.local'

export default {
  mounted: function () {
    this.getBoxDay()
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    boxId: 20,
    BoxList: "",
  }),
  methods: {
    getBoxDay(date = this.date) {
      const url = `${vars.host}boxController.php`
      let form = new FormData()
      form.append('get-box-day', 'true')
      form.append('date', this.date)
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        // let json = JSON.parse(obj)
        console.log(json)
         this.BoxList = json
        // alert(json.msg)
        // document.getElementById('resp').innerHTML = json
      })
    },
    day(dialog) {
      console.log(this.date)
      this.getBoxDay(this.date)
      this.modal= false
      dialog.save(this.date)
    }
  }
}
</script>

<style>
.Fechado {
  background-color: #0275d8;
}
</style>