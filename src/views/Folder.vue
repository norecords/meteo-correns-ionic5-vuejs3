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
        this.getTheme()
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
      })
      client.on('message', (topic, message) => {
        this.parseMqttMessage(JSON.parse(message.toString()))
        console.log('new mqtt entry')
      })
    },
    getTheme () {
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
    },
    parseMqttMessage (message) {
        if (message['outTemp_C']) {
          /* eslint-disable @typescript-eslint/camelcase */
          this.$store.state.weewxdata.current.datetime = new Date ((Number.parseFloat(message['dateTime'])* 1000)).toLocaleString("fr-FR")
          this.$store.state.weewxdata.current.outTemp_formatted = Number.parseFloat(message['outTemp_C']).toFixed(1).replace('.', ',').toString()
          this.$store.state.weewxdata.current.appTemp = Number.parseFloat(message['appTemp_C']).toFixed(1).replace('.', ',').toString() + this.$store.state.weewxdata.unit_label.appTemp
          this.$store.state.weewxdata.current.windspeed = Number.parseFloat(message['windSpeed_kph']).toFixed(0) + ' km/h'
          this.$store.state.weewxdata.current.windGust = Number.parseFloat(message['windGust_kph']).toFixed(0) + ' km/h' 
          this.$store.state.weewxdata.current.winddir = message['windDir'] ? Number.parseFloat(message['windDir']).toFixed(0) + '°' : 'N/A'
          this.$store.state.weewxdata.current.winddir_formatted = message['windDir'] ? Number.parseFloat(message['windDir']).toFixed(0) : 'N/A'
          this.$store.state.weewxdata.station_observations.current.barometer = Number.parseFloat(message['pressure_mbar']).toFixed(1) + this.$store.state.weewxdata.unit_label.barometer
          this.$store.state.weewxdata.station_observations.current.cloudbase = Number.parseFloat(message['cloudbase_meter']).toFixed(0) + this.$store.state.weewxdata.unit_label.cloudbase
          this.$store.state.weewxdata.station_observations.current.dewpoint = Number.parseFloat(message['dewpoint_C']).toFixed(1).replace('.', ',').toString() + this.$store.state.weewxdata.unit_label.dewpoint
          this.$store.state.weewxdata.station_observations.current.outHumidity = Number.parseFloat(message['outHumidity']).toFixed(0) + this.$store.state.weewxdata.unit_label.outHumidity
          

          // {"usUnits": "16.0", "dateTime": "1614247849.0", "UV": "1.4193975699999997", "rainRate_mm_per_hour": "0.0", "maxSolarRad_Wpm2": "510.5922578127411", "hourRain_mm": "0.0", "rain24_mm": "0.0", "dayRain_mm": "0.0"}

          // {"usUnits": "16.0", "dateTime": "1614247878.0", "rainRate_mm_per_hour": "0.0", "maxSolarRad_Wpm2": "511.4098836060721", "hourRain_mm": "0.0", "rain24_mm": "0.0", "dayRain_mm": "0.0", "pressure_mbar": "1013.6402446382689", "outTemp_C": "10.763443571329116", "outHumidity": "100.0", "rain_cm": "0.0", "windSpeed_kph": "1.5133780661837664", "windDir": "226.7133395738949", "windGust_kph": "2.594362399172171", "barometer_mbar": "1033.8479195234886", "altimeter_mbar": "1033.5969459710284", "windchill_C": "10.763443571329118", "heatindex_C": "10.5064545951287", "dewpoint_C": "10.763443571329118", "cloudbase_meter": "163.99999999999977", "humidex_C": "12.402492529574754", "appTemp_C": "10.726250947835663"}

        } else if (message['UV']) {
          this.$store.state.weewxdata.station_observations.current.UV = Number.parseFloat(message['UV']).toFixed(1)
        }
    }
  }
}
</script>
