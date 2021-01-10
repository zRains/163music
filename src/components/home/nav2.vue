<!-- nav2 -->
<template>
  <div id="nav2">
    <ul>
      <li class="active" @click="router.push('/')">推荐</li>
      <li @click="router.push('/phb')">排行榜</li>
      <li>歌单</li>
      <li>主播电台</li>
      <li>歌手</li>
      <li>新碟上架</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({})
    return { state,router }
  },
})
</script>

<style scoped lang="scss">
#nav2 {
  width: 100%;
  height: 35px;
  background: #c20c0c;
  display: flex;
  ul {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    li {
      display: inline-block;
      cursor: pointer;
      line-height: 21px;
      color: #fff;
      padding: 0 13px;
      margin: 0 17px;
      border-radius: 10px;
      &.active {
        background: #9b0909;
      }
    }
  }
}
</style>
