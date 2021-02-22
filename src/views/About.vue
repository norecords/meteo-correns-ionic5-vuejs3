<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>
            {{ $root.appPages[3].title }} 
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
                    <a href="https://github.com/norecords/meteo-correns-ionic5-vuejs3">Follow this project on github</a>
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
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';

export default {
  name: 'About',
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
  }
}
</script>