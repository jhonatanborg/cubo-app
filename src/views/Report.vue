<template>
  <v-app>
    <v-app-bar fixed class="bg-primary mb-4">
      <router-link to="/home">
        <i class="mdi mdi-arrow-left icon-md text-white"></i>
      </router-link>
      <v-toolbar-title class="text-white ml-3">Relátorio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="headline" @click="dialog = true" color="white">mdi-information</v-icon>
    </v-app-bar>

    <v-divider></v-divider>

    <v-list fixed class="bg-primary mt-5">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="headline pt-4 pb-4 font-weight-bold text-white"
          >{{installmentsTotal}} parcelas</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action></v-list-item-action>
      </v-list-item>
    </v-list>
    <v-progress-linear
      color="deep-purple accent-4"
      :indeterminate="isLoading"
      height="6"
      :active="isLoading"
    ></v-progress-linear>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <h5 class="border-bottom border-warning pb-2">Parcelas</h5>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon class="headline" @click="sheet = !sheet" color="primary">mdi-filter-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-list>
      <v-list-item-group
        v-for="installment in installments "
        :key="installment.id"
        class="text-decoration-none"
        color="amber"
      >
        <v-list-item
          tag="router-link"
          v-bind:to="'/parcelreceive/'+ installment.id"
          class="text-decoration-none"
          color="amber"
        >
          <v-list-item-content>
            <v-list-item-title>{{installment.client.name}}</v-list-item-title>
            <v-list-item-subtitle>{{installment.date}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <div :class="installment.status">
              <span class="personal badge badge-pill">{{installment.status}}</span>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-bottom-sheet v-model="sheet">
      <v-sheet height="550px">
        <div class="container">
          <h5 class="pt-4">Nome da empresa</h5>
          <v-autocomplete
            v-model="idClient"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="id"
            label="Buscar empresa..."
            solo
          >
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
              >
                <span v-text="item.name"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >{{ item.name.charAt(0) }}</v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <h5 class="pt-2">Parcelas</h5>
          <v-list>
            <v-list-item link>
              <v-list-item-title>
                <div class="form-check form-group-md">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="VENCIDA"
                      v-model="parcel"
                    />Vencidas
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
                      value="PENDENTE"
                      v-model="parcel"
                    /> Pendentes
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
            <v-list-item link>
              <v-list-item-title>
                <div class="form-check form-group-lg">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="RECEBIDA"
                      v-model="parcel"
                    /> Recebidas
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
          </v-list>
          <!-- <v-btn block to="/home" tag="router-link" color="red" class="mt-2 text-white">Cancelar</v-btn>
          <v-btn v-on:click="salvar()" block class="primary mt-2">Confirmar</v-btn>-->

          <v-divider></v-divider>

          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date1"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date1"
                label="Data inicial"
                prepend-icon="mdi-calendar-range  "
                readonly
                v-on="on"
                hint="DD/MM/YYYY format"
              ></v-text-field>
            </template>
            <v-date-picker locale="pt-BR" v-model="date1" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="saveDate1(date1, $refs.dialog)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-dialog
            ref="dialog2"
            v-model="modal2"
            :return-value.sync="date2"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date2"
                label="Data inicial"
                prepend-icon="mdi-calendar-range  "
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker locale="pt-BR" v-model="date2" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="saveDate2(date2, $refs.dialog2)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-btn class="mt-2" @click="searchFilter()" block color="primary">Buscar</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="bg-app"
    >
      <v-card tile>
        <v-toolbar dense class="bg-primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="text-white text-center">Resumo</v-toolbar-title>
        </v-toolbar>
        <div class="container mt-4">
          <h5 class="border-bottom border-warning pb-2 w-50">Parcelas</h5>
          <div class="card mb-1 p-2 mt-4">
            <div class="d-flex justify-content-between text-white">
              <span class="text-primary">
                <span class="font-weight-bold text-primary">Parcelas Recebidas</span>
              </span>
              <div>
                <span class="font-weight-bold text-primary">{{quantityReceive}}</span>
              </div>
            </div>
          </div>
          <div class="card mb-1 p-2 mt-4">
            <div class="d-flex justify-content-between text-white">
              <span class="text-primary">
                <span class="font-weight-bold text-primary">Parcelas Vencidas</span>
              </span>
              <div>
                <span class="font-weight-bold text-primary">{{quantityDefeat}}</span>
              </div>
            </div>
          </div>
          <div class="card mb-1 p-2 mt-4">
            <div class="d-flex justify-content-between text-white">
              <span class="text-primary">
                <span class="font-weight-bold text-primary">Total a receber</span>
              </span>
              <div>
                <span class="font-weight-bold text-primary">{{quantityPending}}</span>
              </div>
            </div>
          </div>
          <!-- <h5 class="border-bottom border-warning pb-2 w-50 mt-5">Contratos</h5>
          <div class="card mb-1 p-2 mt-4">
            <div class="d-flex justify-content-between text-white">
              <span class="text-primary">
                <span class="font-weight-bold text-primary">Total de Contratos</span>
              </span>
              <div>
                <span class="font-weight-bold text-primary">1820</span>
              </div>
            </div>
          </div>
          <div class="card mb-1 p-2 mt-4">
            <div class="d-flex justify-content-between text-white">
              <span class="text-primary">
                <span class="font-weight-bold text-primary">Contratos abertos</span>
              </span>
              <div>
                <span class="font-weight-bold text-primary">1820</span>
              </div>
            </div>
          </div>
          <div class="card mb-1 p-2 mt-4">
            <div class="d-flex justify-content-between text-white">
              <span class="text-primary">
                <span class="font-weight-bold text-primary">Contratos Fechados</span>
              </span>
              <div>
                <span class="font-weight-bold text-primary">1820</span>
              </div>
            </div>
          </div> -->
          <div class="mx-auto w-50 mt-4">
            <h5 class="border-bottom border-warning pb-2 text-center"></h5>
          </div>
          <v-spacer></v-spacer>
          <div class="pt-5">
            <v-btn block @click="dialog = false" class="primary mt-5">Voltar</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import vars from '../plugins/env.local'

export default {
  data() {
    return {
      activeBtn: 1,
      sheet: false,
      row: null,
      valueInput: null,
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      modal2: false,
      dialog: false,
      isLoading: false,
      items: [],
      idClient: "",
      search: null,
      tab: null,
      parcel: [],
      installments: [],
      interval: {},
      value: 0,
      installmentsTotal: "",
      quantityDefeat:"",
      quantityPending:"",
      quantityReceive:"",

    }
  },
  mounted: function () {
    // `this` points to the vm instance
    this.installmentsAll()

  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },

  methods: {
    saveDate1(date1, dialog) {
      console.log(this.date1)
      dialog.save(this.date1)
      this.modal = false
    },
    saveDate2(date2, dialog2) {
      console.log(this.date2)
      dialog2.save(this.date2)
      this.modal2 = false
    },
    searchFilter() {
      // console.log(this.parcel)
      // console.log(this.idClient)
      // console.log(this.date1)
      // console.log(this.date2)
      // console.log(this.clients)
      // console.log(this.parcel)

      const url = `${vars.host}parcelController.php`
      let formData = new FormData()
      formData.append('filter', 'true')
      formData.append('user-id', localStorage.getItem('user-id'))
      formData.append('client-id', this.idClient)
      formData.append('status', this.parcel)
      formData.append('date-initial', this.date1)
      formData.append('date-final', this.date2)
      console.log(this.idClient)
      // document.getElementById('load').classList.remove('hide')
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        this.installments = json
        this.installmentsTotal = json.length
        // console.log(this.installments)
        // document.getElementById('load').classList.add('hide')
        this.sheet = false
      })

    },

    installmentsAll() {
      this.isLoading = true
      const url = `${vars.host}parcelController.php`
      let formData = new FormData()
      formData.append('filter', 'true')
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        this.installmentsTotal = json.length
        this.installments = json
        this.isLoading = false
        let totalVencida = 0
        let totalPendente = 0
        let totalCobrada = 0
        let totalRecebida = 0
        json.forEach(item => {
          // console.log(item)
          switch (item.status) {
            case 'VENCIDA':
              totalVencida += parseFloat(item.value)
              this.quantityDefeat = totalVencida 
              break;
            case 'PENDENTE':
              totalPendente += parseFloat(item.value)
              this.quantityPending = totalPendente
              break;
            case 'COBRADO':
              totalCobrada += parseFloat(item.value)
              break;
            case 'RECEBIDA':
              totalRecebida += parseFloat(item.value)
              this.quantityReceive = totalRecebida
              break;

            default:
              break;
          }
        })
        console.log(`Total vencidas: ${totalVencida}`)
        console.log(`Total pendetes: ${totalPendente}`)
        console.log(`Total cobradas: ${totalCobrada}`)
        console.log(`Total recebidas: ${totalRecebida}`)
      })
    },
    listParcel() {
      const url = `${vars.host}clientController.php`
      let formData = new FormData()
      formData.append('all-clients', 'true')
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {
        return resp.json()
      }).then(json => {
        json.forEach(item => {
          this.items.push(item)
        })
        console.log(json)

      })
        .finally(() => (this.isLoading = false))
    }
  },
  watch: {
    model(val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true
      const url = `${vars.host}clientController.php`
      let formData = new FormData()
      formData.append('all-clients', 'true')
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(resp => {

        return resp.json()
      }).then(json => {
        json.forEach(item => {
          this.items.push(item)
        })
        console.log(this.items)

      })
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>

<style>
.PENDENTE .personal {
  color: #212529;
  background-color: #ffc100;
}
.RECEBIDA .personal {
  color: #fff;
  background-color: #4d83ff;
}

.COBRADO .personal {
  color: #fff;
  background-color: #8747ff;
}
.VENCIDA .personal {
  color: #fff;
  background-color: #ff4747;
}
</style>