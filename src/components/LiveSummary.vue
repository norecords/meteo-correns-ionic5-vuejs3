<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }} - {{ $store.state.weewxdata.station_url }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-row>
        <ion-col size="6">
          <ion-card>
            <ion-card-content>
              <ion-row>
                <ion-col size="6">
                  forecast
                </ion-col>
                <ion-col size="6">
                  <span
                    v-if="$store.state.weewxdata.current"
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
    </ion-content>
  </ion-page>
</template>

<script>
import { IonCard, IonCardContent, IonCol, IonContent, IonPage, IonRow, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';

export default {
    name: 'LiveSummary',
    components: {
      IonCard,
      IonCardContent,
      IonCol,
      IonContent,
      IonPage,
      IonButtons,
      IonRow,
      IonHeader, 
      IonToolbar,
      IonMenuButton, 
      IonTitle
    },
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
