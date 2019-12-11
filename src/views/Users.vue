<template>
  <div>
    <v-app-bar class="bg-primary fixed-top">
      <v-toolbar-title class="text-white">
        <b>Usuarios</b>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <router-link to="/home">
        <i class="mdi mdi-arrow-left icon-md text-white"></i>
      </router-link>
    </v-app-bar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-spacer class="mt-5"></v-spacer>
    <div class="container mt-4">
      <h5 class="border-bottom border-warning pb-2 w-50">Recentes</h5>
      <div v-for="userI in usersInactive" :key="userI.id">
        <v-card tag="router-link" :to="'/userdetails/' + userI.id" class="card mb-1 p-2 mt-2">
          <div class="d-flex justify-content-between text-primary text-decoration-none">
            <span class>
              <span class="font-weight-bold">{{userI.name}}</span>
            </span>
          </div>
        </v-card>
      </div>
      <v-spacer class="mt-5"></v-spacer>
      <v-divider></v-divider>
      <h5 class="border-bottom border-warning pb-2 w-50">Usuários</h5>
      <div v-for="userA in usersActive" :key="userA.id">
        <v-card tag="router-link" :to="'/userdetails/' + userA.id" class="card mb-1 p-2 mt-2">
          <div class="d-flex justify-content-between text-primary">
            <span class>
              <span class="font-weight-bold">{{userA.name}}</span>
            </span>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import vars from '../plugins/env.local'

export default {
  mounted: function () {
    this.getUsers()
  },
  data: () => ({
    usersActive: [],
    usersInactive: [],
  }),
  methods: {
    getUsers() {
      const url = `${vars.host}userController.php`
      let form = new FormData()
      form.append('get-users', 'true')
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        json.forEach(user => {
          if (user.status == 'Ativo') {
            this.usersActive.push(user)
          } else if (user.status == 'Inativo') {
            this.usersInactive.push(user)
          }
        })
        // console.log(this.usersActive)
        // console.log(this.usersInactive)
        // document.getElementById('resp').innerHTML = json
      })
    },
  }
}
</script>

<style>
</style>