<template>
  <v-app class="bg-primary">
    <div class="container p-3">
      <div class="card shadow">
        <form id="register">
          <input type="hidden" name="register" />
          <div class="login p-3 py-4">
            <div class="d-flex justify-content-left">
              <router-link to="/">
                <i class="mdi mdi-arrow-left"></i>
              </router-link>
            </div>
            <div class="text-center mb-4">
              <div class="d-flex justify-content-center">
                <img
                  class="mr-2"
                  src="../assets/images/vedas-logo.png"
                  alt
                  width="10%"
                  height="10%"
                />
                <h2 class="text-primary">Vedas</h2>
              </div>
            </div>
            <div class="form-group">
              <v-text-field
                label="Nome"
                type="text"
                name="name"
                id="name"
                placeholder="Ex: Pedro Barbosa"
              />
            </div>
            <div class="form-group">
              <v-text-field
                label="E-mail"
                type="e-mail"
                name="email"
                placeholder="Ex: pedro@vedas.com"
              />
            </div>
            <div class="form-group">
              <v-text-field
                label="Telefone"
                type="text"
                name="tel"
                placeholder="Ex: (66) 99999-9999"
              />
            </div>
            <div class="form-group">
              <v-text-field label="Senha" type="password" id="password" name="pass"/>
            </div>
            <v-btn v-on:click="register()" type="submit" block color="primary">Cadastrar</v-btn>
             <v-divider></v-divider>
            <v-btn to="/" block tag="router-link" outlined color="indigo">Voltar</v-btn>
          </div>
        </form>
      </div>
    </div>
  </v-app>
</template>

<script>
import vars from '../plugins/env.local'

export default {
  data: function () {
    return {
      url: `${vars.host}userController.php`
    }
  },
  methods: {
    register() {
      document.getElementById("register").addEventListener("submit", event => {
        event.preventDefault();
        let form = new FormData(document.getElementById("register"));
        fetch(this.url, {
          method: "POST",
          body: form
        }).then(resp => {
          return resp.json()
        }).then(json => {
          console.log(json)
          this.$router.push('/')
        })
      })
    }
  }
};
</script>

<style>
</style>