<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>
          {{ $root.appPages[0].title }} 
          <span v-if="$store.state.weewxdata.current">
            {{ $store.state.weewxdata.current.datetime }}
          </span>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size-xs="12" size-sm="6" size-md="6" size-lg="6" size-xl="4" class="ion-text-center">
            <ion-card>
              <ion-card-content>
                <ion-row>
                  <ion-col size="6">
                    <img
                      v-if="$store.state.forecast.current" 
                      v-bind:src="aerisIcon($store.state.forecast.current[0].response.ob.icon)"
                    />
                  </ion-col>
                  <ion-col size="6">
                    <span
                      v-if="$store.state.weewxdata.current" 
                      :style="tempColorize($store.state.weewxdata.current.outTemp_formatted)"
                      class="weatherdataTemp"
                    >
                      {{ $store.state.weewxdata.current.outTemp_formatted }}<sup class="outtempunitlabelsuper">{{ $store.state.weewxdata.unit_label.outTemp }}</sup>
                    </span>
                    <br>
                    Ressenti
                    <span
                      v-if="$store.state.weewxdata.current"
                      v-html="$store.state.weewxdata.current.appTemp"
                    >
                    </span>
                  </ion-col>
                </ion-row>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size-xs="12" size-sm="6" size-md="6" size-lg="6" size-xl="4"  class="ion-text-center">
            <ion-card>
              <ion-card-content>
                <div class="compass">
                  <div class="direction">
                    <span
                      v-if="$store.state.weewxdata.current"
                      v-html="windCardinals"
                      class="curwinddir"
                    >
                    </span>
                    <span
                      v-if="$store.state.weewxdata.current"
                      v-html="$store.state.weewxdata.current.winddir"
                      class="curwinddeg"
                    >
                    </span>
                  </div>
                  <div
                    v-if="$store.state.weewxdata.current"
                    :style="arrow"
                    class="arrow">
                  </div>
                </div>
                <br>
                  <p>
                    Vitesse 
                    <span
                      v-if="$store.state.weewxdata.current"
                      v-html="$store.state.weewxdata.current.windspeed"
                    >
                    </span>
                  </p>
                  <p>
                    Rafale  
                    <span
                      v-if="$store.state.weewxdata.current"
                      v-html="$store.state.weewxdata.current.windGust"
                    >
                    </span>
                  </p>  
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size-xs="12" size-sm="6" size-md="6" size-lg="6" size-xl="4">
            <ion-card>
              <ion-card-content>
                  <p>
                    Baromètre  
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.barometer"
                    >
                    </span>
                  </p>
                  <p>
                    Visibilité  
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.visibility"
                    >
                    </span>
                  </p>
                  <p>
                    Base nuage  
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.cloudbase"
                    >
                    </span>
                  </p>
                  <p>
                    Qualité de l'air
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.aqi"
                    >
                    </span>
                  </p>
                  <p>
                    Point de rosée
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.dewpoint"
                    >
                    </span>
                  </p>
                  <p>
                    Humidité
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.outHumidity"
                    >
                    </span>
                  </p>
                  <p>
                    Pluie
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.rainWithRainRate"
                    >
                    </span>
                  </p>
                  <p>
                    UV
                    <span
                      v-if="$store.state.weewxdata.station_observations"
                      v-html="$store.state.weewxdata.station_observations.current.UV"
                    >
                    </span>
                  </p>
              </ion-card-content>
            </ion-card>
          </ion-col>      
        </ion-row>
      </ion-grid>  
    </ion-content>
  </ion-page>
</template>

<script>
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';

export default {
  name: 'LiveSummary',
  components: {
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonButtons,
    IonRow,
    IonHeader, 
    IonToolbar,
    IonMenuButton, 
    IonTitle
  },
  methods: {
    aerisIcon: function (data) {
      // https://www.aerisweather.com/support/docs/api/reference/icon-list/
      const iconName = data.split(".")[0]; // Remove .png
      
      const iconDict = {
          "blizzard": "snow",
          "blizzardn": "snow",
          "blowingsnow": "snow",
          "blowingsnown": "snow",
          "clear": "clear-day",
          "clearn": "clear-night",
          "cloudy": "cloudy",
          "cloudyn": "cloudy",
          "cloudyw": "cloudy",
          "cloudywn": "cloudy",
          "cold": "clear-day",
          "coldn": "clear-night",
          "drizzle": "rain",
          "drizzlen": "rain",
          "dust": "fog",
          "dustn": "fog",
          "fair": "mostly-clear-day",
          "fairn": "mostly-clear-night",
          "drizzlef": "rain",
          "fdrizzlen": "rain",
          "flurries": "sleet",
          "flurriesn": "sleet",
          "flurriesw": "sleet",
          "flurrieswn": "sleet",
          "fog": "fog",
          "fogn": "fog",
          "freezingrain": "rain",
          "freezingrainn": "rain",
          "hazy": "fog",
          "hazyn": "fog",
          "hot": "clear-day",
          "N/A ": "unknown",
          "mcloudy": "mostly-cloudy-day",
          "mcloudyn": "mostly-cloudy-night",
          "mcloudyr": "rain",
          "mcloudyrn": "rain",
          "mcloudyrw": "rain",
          "mcloudyrwn": "rain",
          "mcloudys": "snow",
          "mcloudysn": "snow",
          "mcloudysf": "snow",
          "mcloudysfn": "snow",
          "mcloudysfw": "snow",
          "mcloudysfwn": "snow",
          "mcloudysw": "mostly-cloudy-day",
          "mcloudyswn": "mostly-cloudy-night",
          "mcloudyt": "thunderstorm",
          "mcloudytn": "thunderstorm",
          "mcloudytw": "thunderstorm",
          "mcloudytwn": "thunderstorm",
          "mcloudyw": "mostly-cloudy-day",
          "mcloudywn": "mostly-cloudy-night",
          "na": "unknown",
          "pcloudy": "partly-cloudy-day",
          "pcloudyn": "partly-cloudy-night",
          "pcloudyr": "rain",
          "pcloudyrn": "rain",
          "pcloudyrw": "rain",
          "pcloudyrwn": "rain",
          "pcloudys": "snow",
          "pcloudysn": "snow",
          "pcloudysf": "snow",
          "pcloudysfn": "snow",
          "pcloudysfw": "snow",
          "pcloudysfwn": "snow",
          "pcloudysw": "partly-cloudy-day",
          "pcloudyswn": "partly-cloudy-night",
          "pcloudyt": "thunderstorm",
          "pcloudytn": "thunderstorm",
          "pcloudytw": "thunderstorm",
          "pcloudytwn": "thunderstorm",
          "pcloudyw": "partly-cloudy-day",
          "pcloudywn": "partly-cloudy-night",
          "rain": "rain",
          "rainn": "rain",
          "rainandsnow": "rain",
          "rainandsnown": "rain",
          "raintosnow": "rain",
          "raintosnown": "rain",
          "rainw": "rain",
          "showers": "rain",
          "showersn": "rain",
          "showersw": "rain",
          "showerswn": "rain",
          "sleet": "sleet",
          "sleetn": "sleet",
          "sleetsnow": "sleet",
          "sleetsnown": "sleet",
          "smoke": "fog",
          "smoken": "fog",
          "snow": "snow",
          "snown": "snow",
          "snoww": "snow",
          "snowwn": "snow",
          "snowshowers": "snow",
          "snowshowersn": "snow",
          "snowshowersw": "snow",
          "snowshowerswn": "snow",
          "snowtorain": "snow",
          "snowtorainn": "snow",
          "sunny": "clear-day",
          "sunnyn": "clear-night",
          "sunnyw": "mostly-clear-day",
          "sunnywn": "mostly-clear-night",
          "tstorm": "thunderstorm",
          "tstormn": "thunderstorm",
          "tstorms": "thunderstorm",
          "tstormsn": "thunderstorm",
          "tstormsw": "thunderstorm",
          "tstormswn": "thunderstorm",
          "wind": "wind",
          "wintrymix": "sleet",
          "wintrymixn": "sleet"
      }
      console.log('aerisIcon: ' + iconDict[iconName])
      return './img/' + iconDict[iconName] + '.png';    
    },
    tempColorize: function (temp) {
      temp = Number(temp.replace(',', '.'))
      let color;
      if ( temp <= 0 ) color = "#1278c8";
      else if ( temp <= -3.8 ) color = "#30bfef";
      else if ( temp <= 0 ) color = "#1fafdd";
      else if ( temp <= 4.4 ) color = "rgba(0,172,223,1)";
      else if ( temp <= 10 ) color = "#71bc3c";
      else if ( temp <= 12.7 ) color = "rgba(90,179,41,0.8)";
      else if ( temp <= 18.3 ) color = "rgba(131,173,45,1)";
      else if ( temp <= 21.1 ) color = "rgba(206,184,98,1)";
      else if ( temp <= 23.8 ) color = "rgba(255,174,0,0.9)";
      else if ( temp <= 26.6 ) color = "rgba(255,153,0,0.9)";
      else if ( temp <= 29.4 ) color = "rgba(255,127,0,1)";
      else if ( temp <= 32.2 ) color = "rgba(255,79,0,0.9)";
      else if ( temp <= 35 ) color = "rgba(255,69,69,1)";
      else if ( temp <= 43.3 ) color = "rgba(255,104,104,1)";
      else if ( temp >= 43.4 ) color = "rgba(218,113,113,1)";
      console.log('Temp color: ' + color)
      return 'color:' + color;
    },
    rotateThis(newRotation) {
      if ( newRotation == "N/A") { return; }
      let currentRotation;
      let finalRotation 
      finalRotation = finalRotation || 0; // if finalRotation undefined or 0, make 0, else finalRotation
      currentRotation = finalRotation % 360;
      if ( currentRotation < 0 ) { currentRotation += 360; }
      if ( currentRotation < 180 && (newRotation > (currentRotation + 180)) ) { finalRotation -= 360; }
      if ( currentRotation >= 180 && (newRotation <= (currentRotation - 180)) ) { finalRotation += 360; }  finalRotation += (newRotation - currentRotation);
      return finalRotation;
    }
  },
  computed: {
    windCardinals () {
    const directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO','N']
    const cardinal = directions[Math.round(this.$store.state.weewxdata.current.winddir_formatted / 22.5)];
    return cardinal;
    },
    arrow () {
      return { transform: 'rotate(' + this.rotateThis(this.$store.state.weewxdata.current.winddir_formatted) + 'deg)' }
    }
  }
}
</script>

<style scoped>
.weatherdataTemp {
    /* min-width: 55px; 
    display: inline-block;*/
    text-align: center;
    font-size: 45px;
}
.outtempunitlabelsuper {
    top: -1em;
    font-size: 45%;
}

/* Compass from belchertown style.css */
.compass {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  color: #555;
  border: solid #808080 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.compass:before {
  font-weight: bold;
  position: absolute;
  text-align: center;
  width: 100%;
  font-size: 14px;
  top: -2px;
}

.direction {
  height: 100%;
  width: 100%;
  display: block;
  /* background: #f2f6f5; */
  /* background: -moz-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%); */
  /* background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f2f6f5), color-stop(100%, #cbd5d6)); */
  /* background: -webkit-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%); */
  /* background: -o-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%); */
  border-radius: 100%;
}

.direction .curwinddir {
  font-size: 25px;
  margin-top: 10px;
  display: block;
}
  .direction .curwinddeg {
  font-size: 21px;
}

.arrow {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  transition: all 1s ease-in;
}
.arrow:after {
  content: "";
  width: 0;
  height: 0;
  /* border-left: 5px solid transparent; */
  /* border-right: 5px solid transparent; */
  /* border-bottom: 10px solid red; */
  /* top: -6px; */
  /* left: 50%; */
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  /* border-bottom: 21px solid red; */
  border-top: 21px solid red;
  position: absolute;
  top: -10px;
  left: 38px;
  /* margin-left: -5px; */
  z-index: 99;
}
</style>
