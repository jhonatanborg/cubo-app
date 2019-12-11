<template>
  <v-app>
    <v-app-bar class="bg-primary fixed-top mb-4">
      <router-link to="/responsible">
        <i class="mdi mdi-arrow-left icon-md text-white"></i>
      </router-link>
      <v-toolbar-title class="text-white ml-3">Relátorio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon color="white" dark @click="sheet = !sheet">mdi-filter-variant</v-icon>
    </v-app-bar>
    <div class="container">
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <h5 class="border-bottom border-warning pb-2 w-50">Parcelas</h5>
    </div>
    <v-bottom-sheet v-model="sheet">
      <v-sheet height="350px">
        <div class="container">
          <h5 class="pt-4">Nome da empresa</h5>
          <v-text-field required solo placeholder="Buscar" v-model="valueInput" type="text"></v-text-field>
          <h5 class="pt-2">Parcelas</h5>
          <v-radio-group v-model="row" row>
            <v-radio label="Pendentes" value="radio-1"></v-radio>
            <v-radio label="Recebidas" value="radio-2"></v-radio>
          </v-radio-group>
          <v-btn class="mt-2" block color="primary">Buscar</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      activeBtn: 1,
      sheet: false,
      row: null,
    }
  },
}
</script>

<style>
</style>