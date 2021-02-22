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
    this.getData()
    this.getForecast()
    setInterval(() => { console.log('Reloading api...'); this.getData(); }, 300000); // 5 mins
  },
  methods: {
    getData () {
      console.log("Query weewx data")
      axios.get('https://meteo.correns.org/api/v2/api.php', {
        params: {
          q: 'weewx_data'
        }   
      })
      .then((response) => {
        this.$store.commit('weewxData', response.data)
        console.log('weewx data loaded and commited into Vuex')

        const hour = new Date().getHours()
        const sunrise =  Number(this.$store.state.weewxdata.almanac.sunrise_hour)
        const sunset = Number(this.$store.state.weewxdata.almanac.sunset_hour)
        const theme = this.$store.state.weewxdata.extras.belchertown_theme

        if (theme === 'auto') {
          console.log('actual hour: ' + hour)
          console.log('sunrise: ' + sunrise + ' - sunset: ' + sunset)
          if (hour >= sunset && this.$root.theme.mode === '') {
            this.$root.toggleTheme()
            console.log('belchertown_theme: ' + theme)
          } else if (hour <= sunrise && this.$root.theme.mode === 'darkMode') {
            this.$root.toggleTheme()
            console.log('belchertown_theme: ' + theme)
          }
        } else if (theme === 'dark' && this.$root.theme.mode === '') {
          console.log('mode: dark')
          this.$root.toggleTheme()
          console.log('belchertown_theme: ' + theme)
        }
      })
    },
    getForecast () {
      console.log("Query forecast data")
      axios.get('https://meteo.correns.org/api/v2/api.php', {
        params: {
          q: 'forecast'
        }   
      })
      .then((response) => {
        this.$store.commit('forecastData', response.data)
        console.log('Forecast loaded and commited into Vuex')
      })
    }
  }
}
</script>
