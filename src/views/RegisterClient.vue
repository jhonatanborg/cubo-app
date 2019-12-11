<template>
  <v-app>
    <div>
      <v-toolbar class="bg-primary">
        <v-btn icon dark tag="router-link" to="/companies">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="text-white text-center">Novo Cliente</v-toolbar-title>
      </v-toolbar>

      <v-tabs v-model="tabs" color="primary" centered grow>
        <v-tab>Física</v-tab>
        <v-tab>Jurídica</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card flat>
            <div class="container">
              <div class>
                <div class="login p-1 py-4">
                  <div class="mb-5">
                    <label for>Cliente</label>
                    <v-text-field solo v-model="client" type="text" name="name" class />
                  </div>
                  <div class="mt-5">
                    <label for>CPF</label>
                    <v-text-field v-model="cpf" solo type="text" name="cpf" />
                  </div>
                  <div class="mt-2">
                    <label for>Telefone</label>
                    <v-text-field
                      solo
                      placeholder="Ex: (66) 99999-9999"
                      id="tel"
                      name="tel"
                      type="number"
                      v-model="phone"
                    />
                  </div>
                  <div class>
                    <label>Endereço</label>
                    <v-text-field v-model="address
" solo type="text" />
                  </div>
                  <div class="row">
                    <div class="col">
                      <label>Bairro</label>
                      <div id="the-basics">
                        <v-text-field
                          v-model="district"
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
                        <v-text-field v-model="number" value solo id="number" />
                      </div>
                    </div>
                  </div>
                  <div class>
                    <label for>CEP</label>
                    <v-text-field solo v-model="cep" id="cep" class aria-describedby="helpId" />
                  </div>

                  <v-divider></v-divider>
                  <v-btn
                    block
                    color="primary"
                    @click="resgisterClient()"
                    type="submit"
                    class="btn-primary mt-5"
                  >Confirmar</v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <div class="container">
              <div class>
                <div class="login p-1 py-4">
                  <div class>
                    <label>Nome comercial</label>
                    <v-text-field
                      v-model="companyname"
                      solo
                      type="text"
                      name="name"
                      placeholder="Ex: Pedro Barbosa"
                    />
                  </div>
                  <div class>
                    <label>CNPJ</label>
                    <v-text-field v-model="cnpj" solo placeholder="000 000 000 0000/1" id="tel" />
                  </div>
                  <div class>
                    <label>Telefone</label>
                    <v-text-field v-model="phone" solo placeholder="Ex: (66) 99999-9999" id="tel" />
                  </div>
                  <div class>
                    <label>Endereço comercial completo</label>
                    <v-text-field v-model="address
" solo type="text" />
                  </div>
                  <div class="row">
                    <div class="col">
                      <label>Bairro</label>
                      <div id="the-basics">
                        <v-text-field
                          v-model="district"
                          solo
                          id="district"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>
                    <div class="col w-20">
                      <label>Numero</label>
                      <div id="bloodhound">
                        <v-text-field v-model="number" solo id="number" aria-describedby="helpId" />
                      </div>
                    </div>
                  </div>
                  <div class>
                    <label for>CEP</label>
                    <v-text-field v-model="cep" solo id="cep" name="cep" />
                  </div>
                  <v-btn
                    class="mt-5"
                    @click="registerCompany()"
                    type="submit"
                    color="primary"
                    block
                  >Confirmar</v-btn>
                </div>
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

  },
  data: () => ({
    tabs: null,
    owner: "",
    company: "",
    adressResponsible: "",
    adressCompany: "",
    client: "",
    companyname: "",
    cpf: "",
    cnpj: "",
    phone: "",
    address: "",
    district: "",
    number: "",
    cep: "",
  }),
  methods: {
    resgisterClient() {
      let type = "fisica"
      console.log(this.client)
      console.log(this.cpf)
      console.log(this.phone)
      console.log(this.address)
      console.log(this.district)
      console.log(this.number)
      console.log(this.cep)
      console.log(type)

    },
    registerCompany() {
      let type = "juridica"
      console.log(this.companyname)
      console.log(this.cnpj)
      console.log(this.phone)
      console.log(this.address)
      console.log(this.district)
      console.log(this.number)
      console.log(this.cep)
      console.log(type)

    }
  }
}
</script>

<style>
</style>