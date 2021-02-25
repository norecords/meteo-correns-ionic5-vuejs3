<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Menu</ion-list-header>
            <ion-note v-html="store.state.weewxdata.site"></ion-note>
  
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
          <ion-list>
            <ion-item>
              <ion-icon :icon="moonOutline" slot="start"></ion-icon>
              <ion-label>
                Toggle {{ theme.name }} Theme
              </ion-label>
              <ion-toggle @ionChange="toggleTheme()" slot="end"></ion-toggle>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane, IonToggle } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { barChartOutline, barChartSharp , helpBuoyOutline, helpBuoySharp , moonOutline ,pulseOutline, pulseSharp, receiptOutline, receiptSharp } from 'ionicons/icons';

const myBody = document.getElementsByTagName('body')[0];

export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle, 
    IonNote, 
    IonRouterOutlet, 
    IonSplitPane,
    IonToggle
  },
  data () {
    return {
      theme: {
        name: 'Dark',
        mode: ''
      }
    }
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Live',
        url: '/live',
        iosIcon: pulseOutline,
        mdIcon: pulseSharp
      },
      {
        title: 'Graphiques',
        url: '/charts',
        iosIcon: barChartOutline,
        mdIcon: barChartSharp
      },
      {
        title: 'Records',
        url: '/records',
        iosIcon: receiptOutline,
        mdIcon: receiptSharp
      },
      {
        title: 'À propos',
        url: '/about',
        iosIcon: helpBuoyOutline,
        mdIcon: helpBuoySharp
      }
    ];
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const route = useRoute();
    const store = useStore();
    
    return { 
      selectedIndex,
      appPages, 
      barChartOutline,
      barChartSharp,
      helpBuoyOutline,
      helpBuoySharp,
      moonOutline,
      pulseOutline,
      pulseSharp,
      receiptOutline,
      receiptSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : '',
      store
    }
  },
  methods: {
    toggleTheme () {
      console.log('toggleTheme function')
      this.theme.mode = this.theme.mode === 'darkMode' ? '' : 'darkMode'; //toggles theme value
      if (this.theme.mode === 'darkMode') {
        myBody.classList.add('dark')
        this.theme.name = 'Light'
      } else {
        myBody.classList.replace('dark', ':root')
        this.theme.name = 'Dark'
      }
    }
  }
});
</script>

<style scoped>
ion-menu ion-item {
  --background: transparent;
}

ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>