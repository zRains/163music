<template>
  <Nav />
  <router-view></router-view>
  <Player />
</template>

<script>
import Nav from '@/components/nav/nav.vue'
import Player from '@/components/player/player.vue'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    Nav,
    Player,
  },
  setup() {
    const state = reactive({})
    return { state }
  },
})
</script>

<style lang="scss">
@import './assets/root.css';
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
