<template>
  <div>
    <v-toolbar fixed class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="home">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white text-center">Novo empréstimo</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <router-link to="/registerclient">
        <i class="mdi mdi-account-plus icon-md text-white"></i>
      </router-link>
    </v-toolbar>
    <v-divider></v-divider>mt-1
    <div class="container pt-4 bg-app">
      <h5 class="border-bottom border-warning pb-2 w-50">Clientes</h5>
    </div>
    <v-list>
      <v-list-item-group color="amber">
        <v-list-item
          v-for="client in clients"
          :id="client.id"
          v-on:click="redirect(client.id)"
          :key="client.id"
          class
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
    redirect(id) {
      // e.preventDefault()
      localStorage.setItem('client-id', id)
      if (id) {
        this.$router.push('plans')
      }
      console.log(localStorage.getItem('client-id'))
    }
  }
}
</script>