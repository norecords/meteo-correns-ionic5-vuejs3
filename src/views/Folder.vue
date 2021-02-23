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

export default {
  name: 'Folder',
  components: {
    About,
    Charts,
    Live,
    Records
  }
}
</script>
