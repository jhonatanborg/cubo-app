<template>
  <v-app>
    <div>
      <v-toolbar class="bg-primary">
        <v-btn icon dark tag="router-link" to="/clients">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="text-white text-center">Editar</v-toolbar-title>
      </v-toolbar>

      <div class="container">
        <div class>
          <div class="login p-1 py-4">
            <div class>
              <label>Nome comercial</label>
              <v-text-field
                v-model="clientDetails.name"
                solo
                type="text"
                name="name"
                placeholder="Ex: Pedro Barbosa"
              />
            </div>
            <div class>
              <label>Telefone</label>
              <v-text-field
                v-model="clientDetails.tel"
                solo
                placeholder="Ex: (66) 99999-9999"
                id="tel"
              />
            </div>
            <div class>
              <div class="d-flex justify-content-between mb-2">
                <label>{{clientType}}</label>
                <v-btn right @click="editType()" color="secondary">Alterar</v-btn>
              </div>
              <v-text-field
                v-model="clientDetails.doc"
                solo
                placeholder="Ex: (66) 99999-9999"
                id="doc"
              />
            </div>
            <label>Status</label>
            <v-list dense flat>
              <v-list-item @click="stateView = !stateView" name="button">
                <v-list-item-icon>
                  <v-icon>mdi-account-badge</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{clientDetails.status}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
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
                            name="status"
                            value="Ativo"
                            v-model="clientDetails.status"
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
                            name="status"
                            value="Inativo"
                            v-model="clientDetails.status"
                          />Desativar
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
            <div class>
              <label>Endereço comercial completo</label>
              <v-text-field solo type="text" v-model="clientAdress.street" />
            </div>
            <div class="row">
              <div class="col">
                <label>Bairro</label>
                <div id="the-basics">
                  <v-text-field
                    solo
                    v-model="clientAdress.district"
                    id="district"
                    aria-describedby="helpId"
                  />
                </div>
              </div>
              <div class="col w-20">
                <label>Numero</label>
                <div id="bloodhound">
                  <v-text-field
                    solo
                    v-model="clientAdress.number"
                    id="number"
                    aria-describedby="helpId"
                  />
                </div>
              </div>
            </div>
            <div class>
              <label for>CEP</label>
              <v-text-field solo v-model="clientAdress.cep" id="cep" name="cep" />
            </div>
            <v-btn class="mt-5" @click="editConfirm()" color="primary" block>Confirmar</v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import vars from '../plugins/env.local'
import { log } from 'util'
const url = `${vars.host}parcelController.php`

export default {
  mounted: function () {
    this.getClient()
  },
  data: () => ({
    clientDetails: "",
    clientAdress: "",
    show1: false,
    clientType: "",
    stateView: false,


  }),
  methods: {
    getClient() {
      let form = new FormData()
      form.append('this-client', 'true')
      form.append('client-id', this.$route.params.id)
      fetch(url, {
        method: 'POST',
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        this.clientDetails = json[0]
        this.clientAdress = json[0].adress
        this.clientType = json[0].type
        console.log(json[0])
      })
    },
    editConfirm() {
      let form = new FormData()
      form.append('edit-client', 'true')
      form.append('id', this.$route.params.id)
      form.append('name',  this.clientDetails.name)
      form.append('tel', this.clientDetails.tel)
      form.append('doc', this.clientDetails.doc)
      form.append('status',  this.clientDetails.status)
      form.append('street',  this.clientAdress.street)
      form.append('district',  this.clientAdress.district)
      form.append('number',    this.clientAdress.number)
      form.append('cep',    this.clientAdress.cep)
      form.append('type',   this.clientType)
       fetch(url, {
        method: 'POST',
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
       console.log(json)
      })


      console.log(this.clientDetails.name);
      console.log(this.clientDetails.tel);
      console.log(this.clientDetails.doc);
      console.log(this.clientDetails.status);
      console.log(this.clientAdress.street);
      console.log(this.clientAdress.district);
      console.log(this.clientAdress.number);
      console.log(this.clientAdress.cep);
      console.log(this.clientType);




      // fetch(url, {
      //   method: 'POST',
      //   body: form
      // }).then(resp => {
      //   return resp.json()
      // }).then(json => {
      //   this.clientDetails = json[0]
      //   this.clientAdress = json[0].adress
      //   this.clientType = json[0].type
      //   console.log(json[0].adress)
      // })
    
    },
    editType() {
      if (this.clientType === "Física") {
        return this.clientType = "Júridica"
      } else {
        return this.clientType = "Física"
      }

    }
  },

}
</script>

<style>
</style>