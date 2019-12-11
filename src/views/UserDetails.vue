<template>
  <v-app>
    <div>
      <v-app-bar class="bg-primary fixed-top">
        <v-toolbar-title class="text-white">
          <b>Usuário</b>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <router-link to="/home">
          <i class="mdi mdi-arrow-left icon-md text-white"></i>
        </router-link>
      </v-app-bar>
      <div class="container mt-4">
        <v-divider></v-divider>
        <div>
          <h6 class="pt-3 text-primary">Nome</h6>
          <v-text-field dense solo v-model="userDetails.name" :value="userDetails.name"></v-text-field>
          <h6 class="text-primary">E-mail</h6>
          <v-text-field dense solo v-model="userDetails.email" :value="userDetails.email"></v-text-field>
          <h6 class="text-primary">Telefone</h6>
          <v-text-field dense solo v-model="userDetails.tel" :value="userDetails.tel"></v-text-field>
          <h6 class="text-primary">Senha</h6>
          <v-text-field
           v-model="userDetails.pass"
            dense
            solo
            :value="userDetails.pass"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            name="password"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
          <h6 class="text-primary">Status</h6>
          <v-list dense flat>
            <v-list-item @click="stateView = !stateView" name="button">
              <v-list-item-icon>
                <v-icon>mdi-account-badge</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{userDetails.status}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <h5 class="pt-2 text-primary">Permissões</h5>
          <v-list flat dense>
            <v-list-item @click="levelView = !levelView">
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{userDetails.level}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn id="alterUser" @click="alterUser()" block class="primary mt-2">Confirmar</v-btn>
          <v-bottom-sheet v-model="stateView">
            <v-sheet height="300px">
              <v-list>
                <v-subheader>Alterar</v-subheader>
                <v-list-item link>
                  <v-list-item-title>
                    <div class="form-check form-group-md">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          id="domingo"
                          name="status"
                          value="Ativo"
                          v-model="userDetails.status"
                        />Ativar
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </v-list-item-title>
                  <v-list-item-avatar>
                    <v-avatar size="32px" tile>
                      <v-icon>mdi-account-multiple-check</v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>
                    <div class="form-check form-group-lg">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          id="sabado"
                          name="status"
                          value="Inativo"
                          v-model="userDetails.status"
                        /> Desativar
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </v-list-item-title>
                  <v-list-item-avatar>
                    <v-avatar size="32px" tile>
                      <v-icon icon-lg>mdi-account-remove</v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="stateView = !stateView" block class="primary mt-2">Confirmar</v-btn>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-bottom-sheet>
          <v-bottom-sheet v-model="levelView">
            <v-sheet height="300px">
              {{userDetails.level}}
              <v-list>
                <v-subheader>Alterar</v-subheader>
                <v-list-item link>
                  <v-list-item-title>
                    <div class="form-check form-group-md">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          id="Colaborador"
                          name="level"
                          value="Colaborador"
                          v-model="userDetails.level"
                        />Colaborador
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </v-list-item-title>
                  <v-list-item-avatar>
                    <v-avatar size="32px" tile>
                      <v-icon>mdi-account-multiple-check</v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>
                    <div class="form-check form-group-lg">
                      <label class="form-check-label">
                        <input
                          type="radio"
                          class="form-check-input"
                          id="Administrador"
                          name="level"
                          value="Administrador"
                          v-model="userDetails.level"
                        /> Administrador
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </v-list-item-title>
                  <v-list-item-avatar>
                    <v-avatar size="32px" tile>
                      <v-icon icon-lg>mdi-account-remove</v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="levelView = !levelView" block class="primary mt-2">Confirmar</v-btn>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-bottom-sheet>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>

import vars from '../plugins/env.local'
const url = `${vars.host}userController.php`

export default {
  mounted: function () {
    this.getUser()
  },
  data: () => ({
    stateView: false,
    state: "",
    userDetails: "",
    levelView: false,
    show1: false,
  }),
  methods: {
    alterUser() {
      let form = new FormData()
      form.append('alter-user', 'true')
      form.append('user-id', this.$route.params.userid)
      form.append('user-name', this.userDetails.name)
      form.append('user-email', this.userDetails.email)
      form.append('user-tel', this.userDetails.tel)
      form.append('user-pass', this.userDetails.pass)
      form.append('user-status', this.userDetails.status)
      form.append('user-level', this.userDetails.level)
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.text()
      }).then(json => {
        console.log(json)
        // document.getElementById('resp').innerHTML = json
      })
    },
    getUser() {
      let form = new FormData()
      form.append('get-user', 'true')
      form.append('user-id', this.$route.params.userid)
      form.append('echo', 'true')
      fetch(url, {
        method: "POST",
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        console.log(json)
        this.userDetails = json
        // document.getElementById('resp').innerHTML = json
      })
    },
  }
}
</script>

<style>
</style>