<template>
  <div>
    <v-app-bar fixed class="bg-primary">
      <v-toolbar-title>
        <b class="text-white">Confirmação</b>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-app>
      <div class="container mt-2">
        <h5 class="border-bottom border-warning pb-2 w-50">Dados da empresa</h5>
        <v-card class="card-n p-2">
          <h5 class="text-muted">Cliente</h5>
          <h5 class="text-primary">
            <b>{{dados.name}}</b>
          </h5>
        </v-card>
        <v-divider></v-divider>
        <div>
          <v-btn color="purple" class="mb-4" block dark @click="dialog = true">Mensalidades</v-btn>
        </div>
        <h5 class="border-bottom border-warning pb-2 mt-4 w-50">Plano</h5>
        <v-card class="card-n p-2">
          <h5 class="text-muted">Valor do plano</h5>
          <h5 class="text-primary">
            <b>R$ {{valortotal}}</b>
          </h5>
          <h5 class="text-muted">Nº de parcelas</h5>
          <h5 class="text-primary">
            <b>{{quantidadeparcela}} parcelas</b>
          </h5>
        </v-card>

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
              <v-toolbar-title class="text-white text-center">Mensalidades</v-toolbar-title>
            </v-toolbar>
            <div class="container bg-app mt-4">
              <div v-for="item in installments" :key="item[2]">
                <div class="card mb-1 p-2">
                  <div class="d-flex justify-content-between">
                    <span class="text-primary">
                      <b>{{ item[2] }}x {{ item[0]}}</b>
                    </span>
                    <span class="text-primary">
                      <b>{{ item[1] }}</b>
                    </span>
                  </div>
                </div>
              </div>
              <v-btn block class="primary mt-2" @click="dialog = false">Confirmar</v-btn>
            </div>
          </v-card>
        </v-dialog>
        <v-spacer class="py-5"></v-spacer>
        <v-spacer class="py-3"></v-spacer>
        <v-btn block to="/home" tag="router-link" color="red" class="mt-2 text-white">Cancelar</v-btn>
        <v-btn v-on:click="confirm()" block class="primary mt-2">Confirmar</v-btn>
      </div>
      <v-dialog persistent v-model="success" max-width="300px">
        <v-card class="container">
          <div class="text-center">
            <v-icon class="display-4" color="primary">mdi-checkbox-marked-circle-outline</v-icon>
          </div>
          <h5 class="text-center mt-5">{{msgContract}}</h5>
          <v-btn block color="primary" @click="save()">Concluído</v-btn>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import vars from "../plugins/env.local";

export default {
  created: function() {
    // `this` points to the vm instance
    this.getPlan();
    this.getData();
    this.getInstallments();
  },
  data: () => ({
    dialog: false,
    valortotal: "",
    quantidadeparcela: " ",
    valor: " ",
    installments: [],
    curdate: [],
    radios: " ",
    drawer: null,
    msgContract: '',
    items: [
      {
        title: "Home",
        icon: "mdi-view-dashboard",
        router: "/home"
      },
      {
        title: "Novo Emprestimo",
        icon: "mdi-image",
        router: "/login"
      },
      {
        title: "Empresas",
        icon: "mdi-help-box",
        router: "/companies"
      }
    ],
    plan: "",
    dados: "",

    success: ""
  }),
  methods: {
    save() {
      this.$router.push("home");
    },
    getInstallments() {
      this.valortotal = localStorage.getItem("total");
      let today = new Date();
      let d = today.getDate() + 1;
      let m = today.getMonth();
      let y = today.getFullYear();
      let obj = [];
      let verificar = [];
      let curdate = [];
      let number = 1;
      const par = localStorage.getItem("plano");
      let localplan = localStorage.getItem("radios");
      let arrayPlan = localplan.split("-", 2);
      this.valor = arrayPlan[0];
      this.quantidadeparcela = arrayPlan[1];

      let cobrar = localStorage.getItem("checkedNames") || "";
      for (let i = 0; i < arrayPlan[1]; i++) {
        let date = new Date(y, m, d + i);
        let array;
        let dataStr = date.toString();
        if (dataStr.indexOf("Sat") < 0) {
          array = [
            this.valor,
            date.toLocaleDateString("pt-br"),
            number,
            "cobrar"
          ];
        }
        if (dataStr.indexOf("Sun") < 0) {
          array = [
            this.valor,
            date.toLocaleDateString("pt-br"),
            number,
            "cobrar"
          ];
        }
        if (cobrar.indexOf("1") < 0 && dataStr.indexOf("Sat") >= 0) {
          array = [
            this.valor,
            date.toLocaleDateString("pt-br"),
            number,
            "não-cobrar"
          ];
          arrayPlan[1]++;
          number--;
        }
        if (cobrar.indexOf("2") < 0 && dataStr.indexOf("Sun") >= 0) {
          array = [
            this.valor,
            date.toLocaleDateString("pt-br"),
            number,
            "não-cobrar"
          ];
          arrayPlan[1]++;
          number--;
        }
        verificar.push(array);
        if (array[3] === "cobrar") obj.push(array);
        number++;
      }
      console.log(verificar);
      // console.log(obj)
      this.installments = obj;
    },
    getPlan() {
      const url = `${vars.host}planController.php`;
      let formData = new FormData();
      formData.append("plan", "true");
      formData.append("plan-id", this.$route.params.id);
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(resp => {
          return resp.json();
          console.log(json);
        })
        .then(json => {
          json.forEach(item => {
            this.plan = item;
          });
        });
    },
    getData() {
      if (localStorage.getItem("client-id")) {
        const url = `${vars.host}clientController.php`;
        let formData = new FormData();
        formData.append("this-client", "true");
        formData.append("client-id", localStorage.getItem("client-id"));
        fetch(url, {
          method: "POST",
          body: formData
        })
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            this.dados = json[0];
          });
      } else {
        this.$router.push("newloan");
      }
    },
    confirm() {
      const url = `${vars.host}contractController.php`;
      let form = new FormData();
      form.append("confirm", "true");
      let json = JSON.stringify(this.installments);
      form.append("parcelas", json);
      form.append("plan-id", localStorage.getItem("plan-id"));
      form.append("client-id", localStorage.getItem("client-id"));
      form.append("user-id", localStorage.getItem("user-id"));
      fetch(url, {
        method: "POST",
        body: form
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          console.log(json);
          // document.getElementById("respp").innerHTML = json
          if (json.msg.indexOf("Sucesso") > 0) {
            this.msgContract = json.msg
            this.success = true;
            // alert(json.msg)
            // this.$router.push('home')
          }
        });
    }
  }
};
</script>

<style>
</style>