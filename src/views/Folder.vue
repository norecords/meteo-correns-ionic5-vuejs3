<template>
  <transition name="fade">
    <Live v-if="$route.params.id === 'Live'" />
    <Charts v-else-if="$route.params.id === 'Charts'" />
  </transition>
</template>

<script>
import Live from './Live'
import Charts from './Charts'
import axios from 'axios'

export default {
  name: 'Folder',
  components: {
    Live,
    Charts
  },
  ionViewWillEnter () {
    console.log("Query api")
    this.getData()
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
        console.log('api loaded')
      })
    }
  }
}
</script>
