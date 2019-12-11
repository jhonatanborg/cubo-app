<template>
  <v-app>
    <div>
      <v-app-bar class="bg-primary fixed-top mb-4">
        <v-toolbar-title class="text-white">Daddos da empresa</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <router-link to="/responsible">
          <i class="mdi mdi-arrow-left icon-md text-white"></i>
        </router-link>
      </v-app-bar>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <div class="mt-2">
        <div class="container">
          <div class>
            <form id="register-company">
              <input type="hidden" name="register-company" />
              <div class="login p-1 py-4">
                <div class="form-group">
                  <label for>Nome comercial</label>
                  <v-text-field
                    solo
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ex: Pedro Barbosa"
                  />
                </div>
                <div class="form-group">
                  <label for>Endereço comercial completo</label>
                  <v-text-field solo type="text" name="street" />
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label>Bairro</label>
                    <div id="the-basics">
                      <v-text-field solo id="district" name="district" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Numero</label>
                    <div id="bloodhound">
                      <v-text-field solo id="number" name="number" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for>CEP</label>
                  <v-text-field solo id="cep" name="cep" />
                </div>
                <div class="form-group">
                  <label for>Telefone</label>
                  <v-text-field solo placeholder="Ex: (66) 99999-9999" id="tel" name="tel" />
                </div>
                <v-btn block v-on:click="register()" type="submit" color="primary">Avançar</v-btn>
              </div>
              <input id="owner-id" type="hidden" name="owner-id" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import vars from '../plugins/env.local'
const url = `${vars.host}companyController.php`
export default {
  methods: {
    register() {
      if (localStorage.getItem('owner-id')) {
        document.getElementById('owner-id').value = localStorage.getItem('owner-id')
        document.getElementById("register-company").addEventListener("submit", event => {
          event.preventDefault();
          let form = new FormData(document.getElementById("register-company"));
          fetch(url, {
            method: "POST",
            body: form
          }).then(resp => {
            return resp.json()
          }).then(json => {
            console.log(json)
            // let json = JSON.parse(obj)
            if (json.msg.indexOf("sucesso") != -1) {
              localStorage.removeItem('owner-id')
              localStorage.setItem('company-id', json.company_id)
              this.$router.push('plans')
            }
          })
        })
      } else {
        console.log('Ocorreu algum erro ao cadastrar o proprietário da empresa')
        
      }
    }
  }
}
</script>