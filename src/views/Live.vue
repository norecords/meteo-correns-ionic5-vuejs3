<template>
  <ion-page>
    <LiveSummary />
  </ion-page>
</template>

<script>
import LiveSummary from '@/components/LiveSummary'
import { IonPage } from '@ionic/vue'

export default {
  name: 'Live',
  components: {
    LiveSummary,
    IonPage
  }
}
</script>