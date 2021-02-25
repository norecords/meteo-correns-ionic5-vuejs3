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
import { connect } from 'mqtt';
import axios from 'axios'

export default {
  name: 'Folder',
  components: {
    About,
    Charts,
    Live,
    Records
  },
  data () {
    return {
      connection: {
        host: 'iot.correns.org',
        port: 9001,
        endpoint: '/mqtt',
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: 'meteoCorrens_' + Math.random().toString(36).substring(7),
      },
      subscription: {
        topic: 'weather/correns/live/loop',
        qos: 0,
      },
      receiveNews: {},
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },
  ionViewWillEnter () {
    this.getData()
    this.getForecast()
    this.createConnection()
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
        // const hour = 19
        const sunrise =  Number(this.$store.state.weewxdata.almanac.sunrise_hour)
        const sunset = Number(this.$store.state.weewxdata.almanac.sunset_hour)
        const belchertownTheme = this.$store.state.weewxdata.extras.belchertown_theme

        console.log('belchertown_theme: ' + belchertownTheme)

        if (belchertownTheme === 'auto') {
          console.log('actual hour: ' + hour)
          console.log('sunrise: ' + sunrise + ' - sunset: ' + sunset)
          // between sunset and sunrise, this is Night Time
          if (hour >= sunset && this.$root.theme.mode === '' || hour < sunrise && this.$root.theme.name === 'Dark') {
            this.$root.toggleTheme()
            console.log('mode: ' + this.$root.theme.mode)
          // betwenn sunrise and sunset, this Day Time
          } else if (hour >= sunrise && this.$root.theme.mode === 'darkMode' || hour < sunset && this.$root.theme.name === 'Light') {
            this.$root.toggleTheme()
            console.log('mode: lightMode')
            
          }
        } else if (belchertownTheme === 'dark' && this.$root.theme.mode === '') {
            this.$root.toggleTheme()
            console.log('mode: ' + this.$root.theme.mode)
        }
      })  
      .catch((error) => {
        console.log('error: ' + error)
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
    },
    createConnection() {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `wss://${host}:${port}${endpoint}`
      const client = connect(connectUrl, options)
      const { topic } = this.subscription

      client.on('connect', () => {
        console.log('Connection succeeded!')
        client.subscribe(topic, (error, res) => {
          if (error) {
            console.log('Subscribe to topics error', error)
            return
          }
          this.subscribeSuccess = true
          console.log('Subscribe to topics res', res)
        })
      })
      client.on('error', error => {
        console.log('Connection failed', error)
        setInterval(() => { console.log('Reloading api...'); this.getData(); }, 300000); // 5 mins
        // switchAuto
      })
      client.on('message', (topic, message) => {
        this.receiveNews = JSON.parse(message.toString())
        if (this.receiveNews['outTemp_C']) {
          /* eslint-disable @typescript-eslint/camelcase */
          this.$store.state.weewxdata.current.outTemp_formatted = Number.parseFloat(this.receiveNews['outTemp_C']).toFixed(1).replace('.', ',').toString()
          this.$store.state.weewxdata.current.datetime = new Date ((Number.parseFloat(this.receiveNews['dateTime'])* 1000)).toLocaleString("fr-FR")
          this.$store.state.weewxdata.current.windspeedwindSpeed_kph = Number.parseFloat(this.receiveNews['windSpeed_kph'])//.toFixed(2)
          //windDir
          //windGust_kph
        }
        //console.log(message.toString())
        console.log('new mqtt entry')
      })
    }
  }
}
</script>
