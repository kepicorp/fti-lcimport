<template>
  <v-app id="inspire">
    <v-system-bar
      dark
      color="deep-purple lighten-3"
      app
    >
      <span>{{time}}</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-signal-cellular-3</v-icon>
      <v-icon>mdi-wifi</v-icon>
      <v-icon>mdi-battery</v-icon>
    </v-system-bar>

    <v-app-bar 
      height="100"
      app 
      dark
      color="deep-purple lighten-3"
      flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>

             <center> LC Management Tool</center>
  <v-spacer></v-spacer> </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon >
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="deep-purple lighten-3"
      dark
    >
      <Menu />
    </v-navigation-drawer>

    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: "App",
  components: {
    Menu
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    time: function() {
      var myDate = new Date();
       if(myDate.getMinutes()<9){
          return myDate.getHours()+":0"+myDate.getMinutes()
        }
        else{
          return myDate.getHours()+":"+myDate.getMinutes()
        }
    }
  }
}
</script>
