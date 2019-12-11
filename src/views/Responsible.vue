<template>
  <div>
    <v-app-bar class="bg-primary fixed-top ">
      <v-toolbar-title class="text-white">Dados Pessoais</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <router-link to="/newloan">
        <i class="mdi mdi-arrow-left icon-md text-white"></i>
      </router-link>
    </v-app-bar>
    <div class="mt-5">
      <v-app>
      <div class="container">
        <div class>
          <form id="register-owner">
            <input type="hidden" name="register-owner" />
            <div class="login p-1 py-4">
              <div class="form-group mb-5">
                <label for>Nome Responsavel</label>
                <v-text-field solo  type="text" name="name" class="form-control form-control-sm" />
              </div>
              <div class="form-group mt-5">
                <label for>CPF</label>
                <v-text-field solo type="text" name="cpf"/>
              </div>
              <div class="form-group row">
                <div class="col">
                  <label>Bairro</label>
                  <div id="the-basics">
                    <v-text-field solo
                      id="district"
                      name="district"
                      class="form-control form-control-sm"
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col">
                  <label>Numero</label>
                  <div id="bloodhound">
                    <v-text-field solo
                      id="number"
                      name="number"
                      class="form-control form-control-sm"
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group mt-5">
                <label for>CEP</label>
                <v-text-field solo
                  id="cep"
                  name="cep"
                  class="form-control form-control-sm"
                  aria-describedby="helpId"
                />
              </div>
              <div class="form-group mt-5">
                <label for>Telefone</label>
                <v-text-field solo
                  placeholder="Ex: (66) 99999-9999"
                  id="tel"
                  name="tel"
                  type="number"
                  class="form-control form-control-sm"
                />
                <input hidden id="telC" name="telC" />
              </div>
              <v-divider></v-divider>
              <v-btn
              block
              color="primary"
                v-on:click="register()"
                type="submit"
                class="btn-primary mt-5"
              >Cadastrar</v-btn>
            </div>
          </form>
        </div>
      </div>
      </v-app>
    </div>
  </div>
</template>
<script>
import vars from '../plugins/env.local'
export default {
  methods: {
    register() {
      document.getElementById("register-owner").addEventListener("submit", event => {
        event.preventDefault();
        const url = `${vars.host}ownerController.php`
        document.getElementById('telC').value = localStorage.getItem('tel')
        let form = new FormData(document.getElementById("register-owner"));
        fetch(url, {
          method: "POST",
          body: form
        }).then(resp => {
          return resp.json()
        }).then(json => {
          console.log(json)
          if (json.msg.indexOf("sucesso") != -1) {
            console.log('id: '+json.owner_id)
            localStorage.setItem('owner-id', json.owner_id)
            this.$router.push('newcompany')
          }
        })
      })
    }
  }
}
</script>