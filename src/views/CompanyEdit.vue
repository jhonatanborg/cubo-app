<template>
  <v-app>
    <div>
      <v-toolbar class="bg-primary">
        <v-btn icon dark tag="router-link" to="/companies">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="text-white text-center">Editar</v-toolbar-title>
      </v-toolbar>

      <v-tabs v-model="tabs" color="primary" centered grow>
        <v-tab>Responsavel</v-tab>
        <v-tab>empresa</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card flat>
            <div class="container">
              <div class>
                <form id="register-owner">
                  <input type="hidden" name="register-owner" />
                  <div class="login p-1 py-4">
                    <div class=" mb-5">
                      <label for>Nome Responsavel</label>
                      <v-text-field
                      solo
                        v-model="owner.name"
                        type="text"
                        name="name"
                        class=""
                      />
                    </div>
                    <div class=" mt-5">
                      <label for>CPF</label>
                      <v-text-field v-model="owner.cpf" solo type="text" name="cpf" />
                    </div>
                    <div class=" mt-2">
                      <label for>Telefone</label>
                      <v-text-field
                        solo
                        placeholder="Ex: (66) 99999-9999"
                        id="tel"
                        name="tel"
                        type="number"
                        v-model="owner.tel"
                      />
                    </div>
                    <div class=" row">
                      <div class="col">
                        <label>Bairro</label>
                        <div id="the-basics">
                          <v-text-field
                            v-model="adressResponsible.district"
                            value
                            solo
                            id="district"
                            name="district"
                            aria-describedby="helpId"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <label>Numero</label>
                        <div id="bloodhound">
                          <v-text-field v-model="adressResponsible.number" value solo id="number" />
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <label for>CEP</label>
                      <v-text-field
                        solo
                        v-model="adressResponsible.cep"
                        id="cep"
                        class=""
                        aria-describedby="helpId"
                      />
                    </div>

                    <v-divider></v-divider>
                    <v-btn
                      block
                      color="primary"
                      v-on:click="register()"
                      type="submit"
                      class="btn-primary mt-5"
                    >Confirmar</v-btn>
                  </div>
                </form>
              </div>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <div class="container">
              <div class>
                <form id="register-company">
                  <input type="hidden" name="register-company" />
                  <div class="login p-1 py-4">
                    <div class="">
                      <label>Nome comercial</label>
                      <v-text-field 
                      v-model="company.name"
                      solo type="text" name="name" placeholder="Ex: Pedro Barbosa" />
                    </div>
                    <div class="">
                      <label>Telefone</label>
                      <v-text-field 
                                            v-model="company.tel"

                      solo placeholder="Ex: (66) 99999-9999" id="tel" />
                    </div>
                    <div class="">
                      <label>Endereço comercial completo</label>
                      <v-text-field 
                      v-model="adressCompany.street"
                      solo type="text" />
                    </div>
                    <div class=" row">
                      <div class="col">
                        <label>Bairro</label>
                        <div id="the-basics">
                          <v-text-field
                          v-model="adressCompany.district"
                            solo
                            id="district"
                            aria-describedby="helpId"
                          />
                        </div>
                      </div>
                      <div class="col w-20">
                        <label>Numero</label>
                        <div id="bloodhound">
                          <v-text-field
                                                    v-model="adressCompany.number"

                            solo
                            id="number"
                            aria-describedby="helpId"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <label for>CEP</label>
                      <v-text-field 
                      v-model="adressCompany.cep"
                      solo id="cep" name="cep" />
                    </div>
                    <v-btn
                      class="mt-5"
                      v-on:click="register()"
                      type="submit"
                      color="primary"
                      block
                    >Confirmar</v-btn>
                  </div>
                  <input id="owner-id" type="hidden" name="owner-id" />
                </form>
              </div>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-app>
</template>

<script>

import vars from '../plugins/env.local'
const url = `${vars.host}companyController.php`

export default {
  mounted: function () {
    this.getCompany()
  },
  data: () => ({
    tabs: null,
    owner: "",
    company: "",
    adressResponsible: "",
    adressCompany: "",

  }),
  methods: {
    getCompany() {
      let form = new FormData()
      form.append('this-company', 'true')
      form.append('company-id', this.$route.params.id)
      fetch(url, {
        method: 'POST',
        body: form
      }).then(resp => {
        return resp.json()
      }).then(json => {
        // console.log(json)
        this.owner = json[0].owner
        this.company = json[0]
        // console.log(this.owner)
        this.adressCompany = json[0].adress
        this.adressResponsible = json[0].owner.adress
        console.log(this.adressCompany)
      })
    }
  }
}
</script>

<style>
</style>