<template class="bg-app">
  <div>
    <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="/home">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center font-weight-bolder">Clientes</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-spacer class="mt-5"></v-spacer>
    <div class="container">
      <h5 class="border-bottom border-warning pb-2 w-50">Lista de clientes</h5>
       <v-list>
      <v-list-item-group  color="amber">
        <v-list-item
          v-for="client in clients"
          :id="client.id"
        
          :key="client.id"
          class

          tag="router-link" :to="'/clientedit/' + client.id"
        >
          <v-list-item-content>
            <v-list-item-title>{{client.name}}</v-list-item-title>
            <v-list-item-subtitle>{{client.doc}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
    </v-list>
    </div>
  </div>
</template>
<script>

import vars from '../plugins/env.local'

export default {

  created: function () {
    // `this` points to the vm instance
    this.listAllCompanies()
  },
  data: () => ({
    components: [],
    clients: []
  }),
  methods: {
    listAllCompanies() {
      const url = `${vars.host}clientController.php`
      let formData = new FormData()
      formData.append('all-clients', 'true')
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        json.forEach(item => {
          this.clients.push(item)
        })
        console.log(this.clients)
      })
    },

  }
}
</script>

<style>
.PENDENTE .personal {
  color: #212529;
  background-color: #ffc100;
}
.RECEBIDA .personal {
  color: #fff;
  background-color: #4d83ff;
}

.COBRADO .personal {
  color: #fff;
  background-color: #ff4747;
}
</style>