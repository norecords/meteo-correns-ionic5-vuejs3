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
          <ion-col size-sm="12" size-lg="6">
            <ion-card>
              <ion-card-content>
                <ion-row>
                  <ion-col size="6">
                    forecast
                  </ion-col>
                  <ion-col size="6">
                    <span
                      v-if="$store.state.weewxdata.current" 
                      :style="tempColorize($store.state.weewxdata.current.outTemp_formatted)"
                      class="weatherdataTemp"
                    >
                      {{ $store.state.weewxdata.current.outTemp_formatted }}
                      <sup class="outtempunitlabelsuper">°C</sup>
                    </span>
                  </ion-col>
                </ion-row>
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
      console.log(color)
      return 'color:' + color;
    }
  }
}
</script>

<style scoped>
.weatherdataTemp {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: 45px;
}
.outtempunitlabelsuper {
    top: -1em;
    font-size: 50%;
}
</style>
