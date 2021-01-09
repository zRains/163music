<!-- index -->
<template>
  <div id="index">
    <Nav2 />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav2 from '@/components/home/nav2.vue'

import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    Nav2,
  },
  setup() {
    const state = reactive({})
    return { state }
  },
})
</script>

<style scoped lang="scss">
#index {
    width: 100%;
}
</style>
