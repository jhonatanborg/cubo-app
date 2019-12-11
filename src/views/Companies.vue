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
      <div v-for="company in companies" :key="company.id">
        <v-card tag="router-link" :to="'/companyedit/' + company.id" class="card-n rounded mb-2">
          <div class="card-body p-2">
            <div class="media d-flex align-items-center">
              <div class="media-body">
                <h6 class="mb-1 font-weight-bold text-primary">{{company.name}}</h6>
                <p class="mb-0 text-muted">{{company.owner.name}}</p>
              </div>
            </div>
          </div>
        </v-card>
      </div>
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
    companies: []
  }),
  methods: {
    listAllCompanies() {
      const url = `${vars.host}companyController.php`
      let formData = new FormData()
      formData.append('all-companies', 'true')
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        json.forEach(item => {
          this.companies.push(item)
        })
        console.log(this.companies)
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