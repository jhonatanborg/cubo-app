<template class="bg-app">
  <v-app class="bg-app">
    <v-card class="overflow-hidden">
      <v-app-bar fixed class="bg-primary text-white">
        <v-toolbar-title>
          <b>Vedas</b>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn icon tag="router-link" to="newloan">
          <v-icon class="text-white">mdi mdi-tab-plus</v-icon>
        </v-btn>
        <v-btn icon v-if="stateBox != 'ABERTO'">
          <v-icon @click="dialog = true" class="text-white">mdi mdi-inbox-arrow-down</v-icon>
        </v-btn>
        <v-btn icon v-if="stateBox == 'ABERTO'">
          <v-icon @click="dialogCloseBox = true" class="text-white">mdi mdi-package-up</v-icon>
        </v-btn>
        <v-app-bar-nav-icon class="text-white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-app class="pt-5 mt-3 bg-app">
        mt-1
        <v-sheet>
          <v-container class="py-5">
            <!-- <v-text-field label="Buscar" v-model="search" outlined></v-text-field> -->
            <h5 class="border-bottom border-warning pb-2 w-50">Parcelas</h5>
            <div>
              <v-list>
                <v-list-item-group
                  v-for="installment in searchBussines "
                  :key="installment.id"
                  class="text-decoration-none"
                >
                  <v-list-item
                    tag="router-link"
                    v-bind:to="'/parcelreceive/'+ installment.id"
                    class="text-decoration-none"
                    color="amber"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{installment.client.name}}</v-list-item-title>
                      <v-list-item-subtitle v-text="convertDate(installment.date)"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <div :class="installment.status">
                        <span class="personal badge badge-pill">{{installment.status}}</span>
                      </div>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <!-- <div id="resp">
                  aqui
              </div>-->
            </div>
          </v-container>
        </v-sheet>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          class="bg-app"
        >
          <v-card tile>
            <v-toolbar class="bg-primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-white text-center">Abrir caixa</v-toolbar-title>
            </v-toolbar>
            <div class="container bg-app mt-4">
              <h5>Funcionário</h5>
              <div class="card mb-1 p-2 mt-2 text-primary">
                <div class="d-flex justify-content-between text-white">
                  <span class="text-primary">
                    <v-icon class="text-primary">mdi mdi-account-check</v-icon>
                  </span>
                  <div>
                    <span class="font-weight-bold text-primary">{{username}}</span>
                  </div>
                </div>
              </div>
              <div class="card mb-1 p-2 mt-4">
                <div class="d-flex justify-content-between text-white">
                  <span class="text-primary">
                    <v-icon class="text-primary">mdi mdi-calendar-clock</v-icon>
                  </span>
                  <div>
                    <span class="font-weight-bold mr-2 text-primary">Data:</span>
                    <span class="font-weight-bold text-primary"> {{datenow}} </span>
                  </div>
                </div>
              </div>
              <div class="mx-auto w-50 mt-4">
                <h5 class="border-bottom border-warning pb-2 text-center"></h5>
              </div>
              <div class="mt-5">
                <h5>Selecione a rota</h5>
                <v-select :items="select" v-model="selectRouter" label="Selecione a rota" solo></v-select>
              </div>
              <div class>
                <h5>Suprimento inicial</h5>
                <v-text-field v-model="valueBoxOpen" placeholder="0,00" solo></v-text-field>
              </div>
              <v-btn block color="red" @click="dialog = false" class="mt-2 text-white">Cancelar</v-btn>
              <v-btn block class="primary mt-2" @click="openBox()">Confirmar</v-btn>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogCloseBox"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          class="bg-app"
        >
          <v-card tile>
            <v-toolbar class="bg-primary">
              <v-btn icon dark @click="dialogCloseBox = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-white text-center">Fechar caixa</v-toolbar-title>
            </v-toolbar>
            <div class="container bg-app mt-4">
              <div class="card mb-1 p-2 mt-2 bg-primary">
                <div class="d-flex justify-content-between text-white">
                  <span class>
                    <v-icon class="text-white mr-2">mdi mdi-calendar-clock</v-icon>
                    <span class="font-weight-bold">Data</span>
                  </span>
                  <div>
                    <span class="font-weight-bold">{{datenow}}</span>
                  </div>
                </div>
              </div>
              <div class="card mb-1 p-2 mt-2">
                <div class="d-flex justify-content-between text-primary">
                  <span class>
                    <v-icon class="text-primary mr-2">mdi-coin</v-icon>
                    <span class="font-weight-bold">Saldo anterior</span>
                  </span>
                  <div>
                    <span v-text="convertMoney(oldValue)" class="font-weight-bold"></span>
                  </div>
                </div>
              </div>
              <div class="mx-auto w-50 mt-4">
                <h5 class="border-bottom border-warning pb-2 text-center"></h5>
              </div>
              <div class="mt-5">
                <h5 class="border-bottom border-warning pb-2 w-50">Relátorio</h5>
                <div class="card mb-1 p-2 mt-2">
                  <div class="d-flex justify-content-between text-primary">
                    <span class>
                      <span class="font-weight-bold">Recebimentos</span>
                    </span>
                    <div>
                      <span v-text="convertMoney(receiveds)" class="font-weight-bold"></span>
                    </div>
                  </div>
                </div>
                <div class="card mb-1 p-2 mt-2">
                  <div class="d-flex justify-content-between text-primary">
                    <span class>
                      <span class="font-weight-bold">Outras entradas</span>
                    </span>
                    <div>
                      <span v-text="convertMoney(inputs)" class="font-weight-bold"></span>
                    </div>
                  </div>
                </div>
                <div class="card mb-1 p-2 mt-2">
                  <div class="d-flex justify-content-between text-primary">
                    <span class>
                      <span class="font-weight-bold">Outras saídas</span>
                    </span>
                    <div>
                      <span v-text="convertMoney(outputs)" class="font-weight-bold"></span>
                    </div>
                  </div>
                </div>

                <div class="card mb-1 p-2 mt-2 bg-primary">
                  <div class="d-flex justify-content-between text-white">
                    <span class>
                      <v-icon class="text-white mr-2">mdi-coin</v-icon>
                      <span class="font-weight-bold">Saldo Total</span>
                    </span>
                    <div>
                      <span v-text="convertMoney(totalValue)" class="font-weight-bold"></span>
                    </div>
                  </div>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="mt-5">
                <v-btn
                  block
                  color="red"
                  @click="dialogCloseBox = false"
                  class="mt-2 text-white"
                >Cancelar</v-btn>
                <v-btn block class="primary mt-2" v-on:click="closeBox()
                ">Confirmar</v-btn>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </v-app>
      <v-navigation-drawer overlay-color="primary" v-model="drawer" absolute right temporary>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <b>{{username}}</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav hide-overlay>
          <v-list-item
            class="text-decoration-none"
            v-for="item in items"
            :key="item.status"
            link
            tag="router-link"
            :to="item.router"
          >
            <v-list-item-icon class="mr-3">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <div v-if="levelAdm === true">
            <v-list-item
              class="text-decoration-none"
              v-for="item in itemsAdm"
              :key="item.status"
              link
              tag="router-link"
              :to="item.router"
            >
              <v-list-item-icon class="mr-3">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-divider></v-divider>
          <v-btn small @click="logout()" block color="primary">Logout</v-btn>
        </v-list>
      </v-navigation-drawer>
      <v-footer>
        <v-bottom-navigation :value="activeBtn" color="primary" fixed>
          <v-btn v-on:click="installmentsReceiveds()">
            <span>Recebidos</span>
            <v-icon>mdi-calendar-check</v-icon>
          </v-btn>
          <v-btn v-on:click="installmentsPendents()">
            <span>Pendentes</span>
            <v-icon>mdi-calendar-multiple</v-icon>
          </v-btn>
          <v-btn v-on:click="installmentsCharged()">
            <span>Cobrados</span>
            <v-icon>mdi-calendar-remove</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-footer>
    </v-card>
  </v-app>
</template>
<script>
import vars from "../plugins/env.local";

export default {
  mounted: function() {
    // `this` points to the vm instance
    this.installmentsPendents();
    this.verifyBox();
    this.getBoxValues();
    this.levelVerify();
    this.unsuccessful();
  },
  updated: function() {
    this.verifyBox();
    this.levelVerify();
  },
  data: () => ({
    search: "",
    selectRouter: "",
    valueBoxOpen: "",
    username: localStorage.getItem("user-name"),
    datenow: "",
    select: ["Sinop", "Sorriso", "Santa Carmem", "Claudia"],
    dialog: false,
    dialogCloseBox: false,
    activeBtn: 1,
    bottomNav: null,
    drawer: null,
    stateBox: " ",
    nameUser: "",
    oldValue: 0,
    receiveds: 0,
    inputs: 0,
    outputs: 0,
    valueDay: 0,
    totalValue: 0,

    items: [
      {
        title: "Home",
        icon: "mdi-view-dashboard",
        router: "/home"
      },
      {
        title: "Novo Emprestimo",
        icon: "mdi mdi-tab-plus",
        router: "/newloan"
      },
      {
        title: "Clientes",
        icon: "mdi-account-multiple",
        router: "/clients"
      },
      {
        title: "Entrada",
        icon: "mdi-code-greater-than",
        router: "/inputs"
      },
      {
        title: "Saída",
        icon: "mdi-code-less-than",
        router: "/exits"
      }
    ],

    itemsAdm: [
      {
        title: "Caixas",
        icon: "mdi-animation",
        router: "/boxlist"
      },
      {
        title: "Usuários",
        icon: "mdi-account-box-outline",
        router: "/users"
      },
      {
        title: "Contratos",
        icon: "mdi-account-box-outline",
        router: "/listcontracts"
      },
      {
        title: "Relátorio",
        icon: "mdi-clipboard-outline",
        router: "/report"
      }
    ],
    components: [],
    installments: [],
    a: true,
    state: "fixed-top",
    levelAdm: false
  }),

  computed: {
    searchBussines: function() {
      let bussinesArray = this.installments;
      let search = this.search;
      if (!search) {
        return bussinesArray;
      }
      search = search.trim().toLowerCase();
      bussinesArray = bussinesArray.filter(function(item) {
        return item;
      });
      return bussinesArray;
      console.log(bussinesArray);
    }
  },
  methods: {
    installmentsPendents() {
      const url = `${vars.host}parcelController.php`;
      let formData = new FormData();
      formData.append("pendents-installments", "true");
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          // document.getElementById('resp').innerHTML = json
          this.installments = json;
          console.log(json);
        });
    },
    unsuccessful() {
      const url = `${vars.host}parcelController.php`;
      let formData = new FormData();
      formData.append("unsuccessful", "true");
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          console.log(json);
        });
    },
    installmentsReceiveds() {
      const url = `${vars.host}parcelController.php`;
      let formData = new FormData();
      formData.append("receiveds-installments", "true");
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          // console.log(json)
          this.installments = json;
        });
    },
    installmentsCharged() {
      const url = `${vars.host}parcelController.php`;
      let formData = new FormData();
      formData.append("charged-installments", "true");
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          this.installments = json;
        });
    },
    openBox() {
      localStorage.setItem("boxStatus", this.stateBox);
      const url = `${vars.host}boxController.php`;
      let formData = new FormData();
      formData.append("open-box", "true");
      formData.append("value", this.valueBoxOpen);
      formData.append("route", this.selectRouter);
      formData.append("user-id", localStorage.getItem("user-id"));
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          console.log('caixaa')
          console.log(json)
          if (json.boxInfo) {
            localStorage.setItem("boxStatus", "ABERTO");
            localStorage.setItem("boxId", json.boxInfo[0].boxId);
          } else {
            localStorage.setItem("boxStatus", json.statusBox);
            localStorage.setItem("boxId", json.boxId);
          }
          this.stateBox = json.boxInfo[0].status
          this.getBoxValues()
          this.dialog = false;
        });
    },
    closeBox() {
      localStorage.setItem("boxStatus", this.stateBox);
      const url = `${vars.host}boxController.php`;
      let formData = new FormData();
      formData.append("close-box", "true");
      formData.append("value-final", this.totalValue);
      formData.append("box-id", localStorage.getItem("boxId"));
      formData.append("user-id", localStorage.getItem("user-id"));
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          // document.getElementById('resp').innerHTML = json
          localStorage.setItem("boxStatus", "FECHADO");
          localStorage.setItem("boxId", null);
          // console.log(json)
          this.dialogCloseBox = false;
        });
    },
    getBoxValues() {
      localStorage.setItem("boxStatus", this.stateBox);
      if (this.stateBox == "ABERTO") {
        const url = `${vars.host}boxController.php`;
        let formData = new FormData();
        formData.append("get-box-values", "true");
        formData.append("box-id", localStorage.getItem("boxId"));
        formData.append("user-id", localStorage.getItem("user-id"));
        fetch(url, {
          method: "POST",
          body: formData
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            // document.getElementById('resp').innerHTML = json
            this.inputs = json.inputs;
            this.outputs = json.outputs;
            this.receiveds = json.receiveds;
            this.totalValue = json.valueTotal;
            this.oldValue = json.boxInfo[0].openValue;
            this.dialogCloseBox = false;
            console.log(json)
          });
      }
    },
    verifyBox() {
      let date = new Date(),
        mouth = (date.getMonth() + 1).toString().padStart(2, "0");
      this.datenow = date.getDate() + "/" + mouth + "/" + date.getFullYear();
      this.stateBox = localStorage.getItem("boxStatus");
    },
    userVerify() {
      this.nameUser = localStorage.getItem("user-name");
    },
    levelVerify() {
      let levelAdm = localStorage.getItem("level");
      // console.log(levelAdm)
      if (levelAdm === "Administrador") {
        this.levelAdm = true;
      } else {
        this.levelAdm = false;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    convertMoney(money) {
      const toCurrency = (n, curr, LanguageFormat = undefined) =>
        Intl.NumberFormat(LanguageFormat, {
          style: "currency",
          currency: curr
        }).format(n);
      return toCurrency(money, "BRL");
    },
    convertDate(date) {
      var parts = date.split("-");
      var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
      return mydate.toLocaleDateString();
    }
  }
};
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