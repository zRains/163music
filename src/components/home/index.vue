<!-- index -->
<template>
  <div id="index">
    <Nav2 />
    <Main />
  </div>
</template>

<script>
import Nav2 from '@/components/home/nav2.vue'
import Main from '@/components/home/rec/recommend.vue'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    Nav2,
    Main,
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
