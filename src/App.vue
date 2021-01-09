<template>
  <Nav />
  <!-- <router-view name="view1"/> -->
  <Index />
  <Player />
</template>

<script>
import Nav from '@/components/nav/nav.vue'
import Player from '@/components/player/player.vue'
import Index from '@/components/home/index.vue'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    Nav,
    Player,
    Index,
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
