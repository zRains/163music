<!-- recommend -->
<template>
  <div id="recommend">
    <Wapper />
    <Main/>
  </div>
</template>

<script>
import Wapper from '@/components/home/rec/wapper.vue'
import Main from '@/components/home/rec/main.vue'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    Wapper,
    Main
  },
  setup() {
    const state = reactive({})
    return { state }
  },
})
</script>

<style scoped lang="scss">
#recommend {
  width: 100%;
}
</style>
