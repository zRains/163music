<!--  -->
<template>
  <div id="nav">
    <span id="logo" :style="'background-image:url(' + state.imgs.logo + ')'">
    </span>
    <section class="fun">
      <span class="findmusic">发现音乐</span>
      <span class="mymusic">我的音乐</span>
      <span class="friend">朋友</span>
      <span class="shop">商城</span>
      <span class="singer">音乐人</span>
      <span class="download">下载客户端</span>
    </section>
    <section class="util">
      <section class="search">
        <label>
          <img :src="state.imgs.search"/>
          <input type="text" id="search" placeholder="音乐/视频/电台/用户"
        /></label>
      </section>
      <section class="creator">创作者中心</section>
      <section class="login">登录</section>
    </section>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      imgs: {
        logo: require('@/assets/svg/logo.svg'),
        search: require('@/assets/svg/search.svg'),
      },
    })
    return { state }
  },
})
</script>

<style scoped lang="scss">
#nav {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #242424;
  display: flex;
  #logo {
    width: 157px;
    margin-right: 20px;
    overflow: hidden;
    background-repeat: no-repeat;
    object-fit: cover;
    background-position: center center;
    background-size: 110%;
    cursor: pointer;
  }
  .fun {
    display: flex;
    margin-right: 20px;
    span {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
      padding: 0 19px;
      color: #cccccc;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: #000;
        color: #fff;
      }
    }
  }
  .util {
    display: flex;
    align-items: center;
    .search {
      label {
        position: relative;
        display: block;
        img {
          position: absolute;
          height: 20px;
          left: 5px;
          top: 0;
          transform: translateY(6px);
        }
        input {
          box-sizing: content-box;
          outline: none;
          border: none;
          height: 32px;
          width: 150px;
          padding-left: 32px;
          border-radius: 50px;
        }
      }
    }
    .creator {
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 20px;
      font-size: 12px;
      margin-left: 12px;
      color: #cccccc;
      cursor: pointer;
      &:hover {
        border: 1px solid #fff;
        color: #fff;
      }
    }
    .login {
      cursor: pointer;
      color: #787878;
      font-size: 12px;
      margin-left: 20px;
      &:hover {
        text-decoration: underline;
        color: #666;
      }
    }
  }
}
</style>
