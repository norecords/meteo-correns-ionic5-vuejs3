<template>

    <transition name="fade">
      <Live v-if="$route.params.id === 'Live'" />

      <Charts v-else-if="$route.params.id === 'Charts'" />

      
    </transition>

</template>


<script>
import Live from './Live'
import Charts from './Charts'

export default {
  name: 'Folder',
  components: {
    Live,
    Charts
  },
}
</script>
