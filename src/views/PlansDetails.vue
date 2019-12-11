<template>
  <div class="h-100">
    <v-toolbar class="bg-primary fixed-top">
      <v-btn icon dark tag="router-link" to="/plans">
        <v-icon>mdi mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="text-white">
        <b class="text-white">Plano: R$ {{plan.value}}</b>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-app class="container">
      <h5 class="border-bottom border-warning pb-2 w-50">Confirmar plano</h5>
      <v-card class="card-n p-2">
        <h5 class="text-muted">Empresa</h5>
        <h5 class="text-primary">
          <b>{{dados.name}}</b>
        </h5>
        <h5 class="text-muted">Responsável</h5>
        <h5 class="text-primary">
          <b>{{owner.name}}</b>
        </h5>
      </v-card>
      <div class="card mb-1 p-2 mt-2 bg-primary">
        <div class="d-flex justify-content-between text-white">
          <span class>
            <v-icon class="text-white mr-2">mdi-coin</v-icon>
            <span class="font-weight-bold">Valor Total:</span>
          </span>
          <div>
            <span class="font-weight-bold">R$ {{plan.value}}</span>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <v-bottom-sheet v-model="DaysOptions">
        <template v-slot:activator="{ on }">
          <v-btn color="purple" dark v-on="on">Finais de semana</v-btn>
        </template>
        <v-card>
          <v-list>
            <v-subheader>Cobrar esses dias</v-subheader>
            <v-list-item link>
              <v-list-item-title>
                <div class="form-check form-group-md">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="domingo"
                      value="2"
                      v-model="checkedNames"
                    />Domingo
                    <i class="input-helper"></i>
                  </label>
                </div>
              </v-list-item-title>
              <v-list-item-avatar>
                <v-avatar size="32px" tile>
                  <v-icon>mdi-calendar-plus</v-icon>
                </v-avatar>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>
                <div class="form-check form-group-lg">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="sabado"
                      value="1"
                      v-model="checkedNames"
                    /> Sábado
                    <i class="input-helper"></i>
                  </label>
                </div>
              </v-list-item-title>
              <v-list-item-avatar>
                <v-avatar size="32px" tile>
                  <v-icon icon-lg>mdi-calendar-plus</v-icon>
                </v-avatar>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
              <v-btn @click="DaysOptions = !DaysOptions" block class="primary mt-2">Confirmar</v-btn>
            </v-list-item>
          </v-list>
          <!-- <v-btn block to="/home" tag="router-link" color="red" class="mt-2 text-white">Cancelar</v-btn>
          <v-btn v-on:click="salvar()" block class="primary mt-2">Confirmar</v-btn>-->
        </v-card>
      </v-bottom-sheet>
      <v-divider></v-divider>
      <v-card class="card-n p-3">
        <h5>Escolha a quantidade de parcelas:</h5>
        <div v-if="errors.length">
          <b>Por favor escolha um plano</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <form action></form>
        <div class="form-check">
          <h4 class="form-check-label">
            <input
              required
              type="radio"
              class="form-check-input"
              name="plano"
              v-model="radios"
              :value="`${plan.p11}-11`"
            />
            11 vezes de {{plan.p11}}
            <i class="input-helper"></i>
          </h4>
        </div>
        <div class="form-check">
          <h4 class="form-check-label">
            <input
              required
              type="radio"
              class="form-check-input"
              name="plano"
              v-model="radios"
              :value="`${plan.p24}-24`"
            />
            24 vezes de {{plan.p24}}
            <i class="input-helper"></i>
          </h4>
        </div>
      </v-card>
      <v-divider></v-divider>
      <div>
        <v-btn block to="/home" tag="router-link" color="red" class="mt-2 text-white">Cancelar</v-btn>
        <v-btn v-on:click="salvar()" block class="primary mt-2">Confirmar</v-btn>
      </div>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title>
            Por favor selecione a
            <br />quantidade de parcelas
          </v-card-title>
          <v-card-text>Para conseguir avançar essa etapa é necessário selecionar um plano</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import { log } from 'util'
import vars from '../plugins/env.local'
export default {
  mounted: function () {
    // `this` points to the vm instance
    this.getData()
    this.getPlan()
    localStorage.removeItem('radios')
  },
  data: () => ({
    DaysOptions: false,
    checkedNames: [],
    errors: [],
    radios: '',
    drawer: null,
    items: [{
      title: 'Home',
      icon: 'mdi-view-dashboard',
      router: '/home'
    }, {
      title: 'Novo Emprestimo',
      icon: 'mdi-image',
      router: '/login'
    }, {
      title: 'Empresas',
      icon: 'mdi-help-box',
      router: '/companies'
    },],
    plan: '',
    dados: '',
    owner: '',
    sheets: '',
    dialog: false,
  }),
  watch: {
    radios(newRadio) {
      localStorage.radios = newRadio;
    },
    checkedNames(newCkeck) {
      localStorage.checkedNames = newCkeck;
    }
  },
  methods: {
    salvar() {
      if (this.radios) {
        console.log("deu certo")
        localStorage.setItem('total', this.plan.value);
        this.$router.push('/confirmcontract')
      } else {
        this.dialog = true
      }

    },
    getPlan() {
      const url = `${vars.host}planController.php`
      let formData = new FormData()
      formData.append('plan', 'true')
      formData.append('plan-id', this.$route.params.id)
      localStorage.setItem('plan-id', this.$route.params.id)
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        json.forEach(item => {
          this.plan = item
        })
      })
    },
    getData() {
      if (localStorage.getItem('company-id')) {
        const url = `${vars.host}companyController.php`
        let formData = new FormData()
        formData.append('this-company', 'true')
        formData.append('company-id', localStorage.getItem('company-id'))
        fetch(url, {
          method: 'POST',
          body: formData
        }).then(resp => {
          return resp.json()
        }).then(json => {
          console.log(json);
          this.dados = json[0]
          this.owner = json[0].owner
        })
      } else {
        this.$router.push('newloan')
      }
    }

  },

}


</script>