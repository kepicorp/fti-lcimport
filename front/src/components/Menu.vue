<template>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>


</template>

<script>
export default {
    name: "Menu",
    data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', link: '/'},
        { title: 'Import LC', icon: 'mdi-account-box', link: '/import' },
        { title: 'Status LC', icon: 'mdi-gavel', link: "/status" },
      ],
    }
  }
}
</script>