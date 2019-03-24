<template>
  <div>
    <v-app>
      <Navbar></Navbar>

      <v-content>
        <router-view></router-view>
      </v-content>
      <v-btn color="success" @click="getThis()">text</v-btn>
      <!-- <v-btn color="success" @click='this.console.log("123")'>text</v-btn> -->
    </v-app>
    <!-- <Button @click.native='console.log("123")'>text22</Button> -->
    <v-btn @click.native='alert("123")'>text23</v-btn>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
    getThis() {
      console.log(this);
    }
  }
};
</script>

<style>

</style>
