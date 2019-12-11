<template>
  <v-app class="login">
    <div class="bg-primary vh-100">
      <div class="container col-sm-4 p-3">
        <div class="h-100">
          <div class="card shadow mt-5 my-auto col-sm-12">
            <form id="login">
              <input type="hidden" name="login" />
              <div class="login p-3 py-5">
                <div class="text-center mb-5 pt-4">
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
                  <v-text-field required small label="Usuário" id="email" name="email" type="text"></v-text-field>
                </div>
                <div class="form-group">
                  <v-text-field  small label="Senha" id="pass" name="pass" type="password" required></v-text-field>
                </div>
                <v-btn type="submit" block color="primary" @click="login()">Login</v-btn>
                <v-divider></v-divider>
                <v-btn tag="router-link" to="/register" outlined block color="primary">Cadastrar</v-btn>
                <div class="text-center mt-4">
                  <span class="badge badge-pill badge-primary">vedassistemas.com.br</span>
                </div>
              </div>
              <!-- <div id="resp"></div> -->
            </form>
          </div>
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
    this.verifyLogin()
  },
  methods: {
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    verifyLogin() {
      if (localStorage.getItem('user-id') && localStorage.getItem('user-name')) {
        this.$router.push('Home')
      }
    },
    login() {
      document.getElementById('login').addEventListener('submit', e => {
        e.preventDefault()
        let form = new FormData(document.getElementById("login"));
        fetch(url, {
          method: "POST",
          body: form
        }).then(resp => {
          return resp.json()
        }).then(json => {
          // let json = JSON.parse(obj)
          console.log(json)
          // document.getElementById('resp').innerHTML = json
          if (json.status === 'Ativo') {
            localStorage.setItem('user-name', json.name)
            localStorage.setItem('user-id', json.userId)
            localStorage.setItem('boxStatus', json.box_status[1])
            localStorage.setItem('boxId', json.box_status[0])
            localStorage.setItem('level', json.level)
            this.$router.push('Home')
          }
        })
      })
    }
  }
}
</script>
