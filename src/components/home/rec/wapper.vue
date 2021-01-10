<!-- wapper -->
<template>
  <div id="wapper">
    <div class="content">
      <div id="arrow_left"><img :src="state.imgs.arrow" /></div>
      <div class="imgs">
        <div class="item" ref="wapper">
          <img :src="state.wapper[0]" />
          <img :src="state.wapper[1]" />
          <img :src="state.wapper[2]" />
        </div>
        <div class="dots">
          <span
            :class="{ active: i == state.current_wapper + 1 }"
            v-for="i in state.wapper.length"
            :key="i"
            @click="changeWappper(i)"
          ></span>
        </div>
      </div>
      <div
        class="download"
        :style="'background-image:url(' + state.imgs.appicon2 + ')'"
      ></div>

      <div id="arrow_right">
        <img :src="state.imgs.arrow" />
      </div>
    </div>
    <div
      class="wapper_fliter"
      :style="
        'background-image:url(' + state.wapper[state.current_wapper] + ')'
      "
    ></div>
  </div>
</template>

<script>
import test_wapper from '@/assets/img/biber.jpg'
import test_wapper1 from '@/assets/img/test_wapper.jpg'
import test_wapper2 from '@/assets/img/test_wapper2.jpg'
import test_wapper3 from '@/assets/img/test_wapper3.jpg'
import { defineComponent, reactive, onMounted, ref } from 'vue'
export default defineComponent({
  setup() {
    const wapper = ref(null)
    const state = reactive({
      imgs: {
        arrow: require('@/assets/svg/arrow.svg'),
        appicon: require('@/assets/svg/appicon.svg'),
        appicon2: require('@/assets/svg/appicon2.svg'),
      },
      wapper: [test_wapper, test_wapper3, test_wapper2],
      wapper_length: 0,
      wapper_width: 0,
      wapper_action: null,
      current_wapper: 0,
    })
    const wapperAction = function(el, counter = 1) {
      el.style.left = -state.wapper_width * (counter - 1) + 'px'
      state.current_wapper = counter - 1
      if (!!state.wapper_action) clearInterval(state.wapper_action)
      state.wapper_action = setInterval(() => {
        counter %= state.wapper_length
        el.style.left = -state.wapper_width * counter + 'px'
        counter++
        state.current_wapper = counter - 1
      }, 3000)
    }
    const changeWappper = function(index) {
      wapperAction(wapper.value, index)
    }
    onMounted(() => {
      state.wapper_length = wapper.value.childNodes.length
      state.wapper_width = wapper.value.childNodes[0].offsetWidth
      wapperAction(wapper.value)
    })
    return { state, wapper, changeWappper }
  },
})
</script>

<style scoped lang="scss">
#wapper {
  position: relative;
  width: 100%;
  height: 285px;
  overflow: hidden;
  .content {
    position: relative;
    height: 100%;
    width: 980px;
    margin: 0 auto;
    background: #ecf0f1;
    z-index: 2;
    .imgs {
      position: relative;
      display: inline-block;
      height: 100%;
      width: 730px;
      overflow: hidden;
      .item {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        transition: 0.5s cubic-bezier(0.07, 0.46, 0.25, 0.94);
        img {
          height: 100%;
          width: 730px;
          cursor: pointer;
        }
      }

      .dots {
        position: absolute;
        bottom: 0;
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 2;
        span {
          display: inline-block;
          height: 20px;
          width: 20px;
          margin: 0 5px;
          cursor: pointer;
          &::after {
            display: block;
            content: '●';
            line-height: 20px;
            text-align: center;
            color: #a9acae;
            border-radius: 50%;
          }
          &.active::after,
          &:hover::after {
            color: #c20c0c;
          }
        }
      }
    }
    .download {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      right: 0;
      width: 250px;
      height: 100%;
      background: #242424;
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    #arrow_right,
    #arrow_left {
      position: absolute;
      top: calc(50% - 30px);
      transition: 0.2s;
      user-select: none;
      cursor: pointer;
      img {
        height: 60px;
        width: 40px;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    }
    #arrow_right {
      right: -70px;
      img {
        transform: rotate(180deg);
      }
    }
    #arrow_left {
      left: -70px;
    }
  }
  .wapper_fliter {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    transition: 0.5s;
    transition-delay: 0.5s;
    filter: blur(25px);
    transform: scale(1.2);
    pointer-events: none;
    z-index: 1;
  }
}
</style>
