<template>
  <v-app>
    <div>
      <v-toolbar class="bg-primary">
        <v-btn icon dark tag="router-link" to="/newloan">
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
                    <label for>Nome completo</label>
                    <v-text-field
                    required
                     :rules="nameRules"
                     solo v-model="client" type="text"/>
                  </div>
                  <div class="mt-5">
                    <label for>CPF</label>
                    <v-text-field
                      v-mask="['###.###.###-##']"
                      v-model="cpf"
                      solo
                      type="text"
                      name="cpf"
                    />
                  </div>
                  <div class="mt-2">
                    <label for>Telefone</label>
                    <v-text-field
                      v-mask="['(##) ####-####', '(##) #####-####']"
                      solo
                      placeholder="Ex: (66) 99999-9999"
                      name="tel"
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
                      <label>Número</label>
                      <div id="bloodhound">
                        <v-text-field type="number" v-model="number" value solo id="number" />
                      </div>
                    </div>
                  </div>
                  <div class>
                    <label for>CEP</label>
                    <v-text-field
                      v-mask="['#####-###']"
                      solo
                      v-model="cep"
                      id="cep"
                      class
                      aria-describedby="helpId"
                    />
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
          <v-snackbar v-model="snackbar" >
              {{ msg }}
              <v-btn color="red" text @click="snackbar = false">Fechar</v-btn>
            </v-snackbar>
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
                    <v-text-field
                      v-mask="['##.###.###/####-##']"
                      v-model="cnpj"
                      solo
                      placeholder="000 000 000 0000/1"
                    />
                  </div>
                  <div class>
                    <label>Telefone</label>
                    <v-text-field
                      v-mask="['(##) ####-####', '(##) #####-####']"
                      v-model="phone"
                      solo
                      placeholder="Ex: (66) 99999-9999"
                    />
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
                      <label>Número</label>
                      <div id="bloodhound">
                        <v-text-field type="number" v-model="number" solo id="number" aria-describedby="helpId" />
                      </div>
                    </div>
                  </div>
                  <div class>
                    <label for>CEP</label>
                    <v-text-field v-mask="['#####-###']" v-model="cep" solo id="cep" name="cep" />
                  </div>
                  <v-btn class="mt-5" @click="registerCompany()" color="primary" block>Confirmar</v-btn>
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
import vars from "../plugins/env.local";
const url = `${vars.host}clientController.php`;

export default {
  mounted: function() {},
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
    msg:'',
    snackbar: false,
     nameRules: [
        v => !!v || 'Nome é necessário'
      ],
  }),
  methods: {
    resgisterClient() {
      let form = new FormData();
      form.append("register-client", "true");
      form.append("street", this.address);
      form.append("district", this.district);
      form.append("number", this.number);
      form.append("cep", this.cep);
      form.append("name", this.client);
      form.append("doc", this.cpf);
      form.append("tel", this.phone);
      form.append("type", "Fisíca");
      fetch(url, {
        method: "POST",
        body: form
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          console.log(json);
          this.msg = json.msg
          this.snackbar = true
          this.cpf = '', this.address = '', this.district = '', this.number = '', this.cep = '', this.client = '', this.phone = ''
        });
    },
    registerCompany() {
      let form = new FormData();
      form.append("register-client", "true");
      form.append("street", this.address);
      form.append("district", this.district);
      form.append("number", this.number);
      form.append("cep", this.cep);
      form.append("name", this.companyname);
      form.append("doc", this.cnpj);
      form.append("tel", this.phone);
      form.append("type", "Jurídica");
      fetch(url, {
        method: "POST",
        body: form
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          console.log(json);
          this.msg = json.msg
          this.snackbar = true
          this.cnpj = '', this.address = '', this.district = '', this.number = '', this.cep = '', this.companyname = '', this.phone = ''
        });
    },
  }
};
</script>

<style>
</style>