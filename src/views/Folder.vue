<template>
  <transition name="fade">
    <Live v-if="$route.params.id === 'live'" />
    <Charts v-else-if="$route.params.id === 'charts'" />
    <Records v-else-if="$route.params.id === 'records'" />
    <About v-else-if="$route.params.id === 'about'" />
  </transition>
</template>

<script>
import About from './About'
import Charts from './Charts'
import Live from './Live'
import Records from './Records'
import axios from 'axios'

export default {
  name: 'Folder',
  components: {
    About,
    Charts,
    Live,
    Records
    
  },
  ionViewWillEnter () {
    console.log("Query for api")
    this.getData()
    setInterval(() => { console.log('Reloading api...'); this.getData(); }, 300000); // 5 mins
  },
  methods: {
    getData () {
      axios.get('https://meteo.correns.org/api/v2/api.php', {
        params: {
          q: 'weewx_data'
        }   
      })
      .then((response) => {
        this.$store.commit('weewxData', response.data)
        console.log('Api is loaded and commited into Vuex')
      })
    }
  }
}
</script>
