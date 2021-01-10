<!-- search -->
<template>
  <div id="search">
    <section class="search_box">
      <label>
        <input
          type="text"
          v-model="state.search_text"
          @keydown.enter="starSearch"
        />
        <span @click="starSearch"><img :src="state.imgs.search"/></span>
      </label>
    </section>
    <section class="result_count">
      预加载 {{ state.search_reault.length }} 首单曲
    </section>
    <section class="result">
      <ul>
        <li class="active">单曲</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>视频</li>
        <li>歌词</li>
        <li>歌单</li>
        <li>用户</li>
      </ul>
      <ul>
        <li v-for="(item, index) in state.search_reault" :key="index">
          <span @click="PLAY(index)">▲</span>
          <span>{{ item.name }}</span>
          <span>{{ item.artist }}</span>
          <span>{{ item.album }}</span>
          <span>{{ item.songTimeMinutes }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const state = reactive({
      imgs: {
        search: require('@/assets/svg/search.svg'),
      },
      search_text: '',
      search_reault: [],
    })
    const starSearch = function() {
      if (state.search_text.length) {
        axios
          .get(`http://106.75.179.28:8080/api/song?key=${state.search_text}`)
          .then(res => {
            state.search_reault = res.data
          })
      }
    }
    const PLAY = function(index) {
      let song = state.search_reault[index]
      axios
        .get(`http://106.75.179.28:8080/api/download/song?rid=${song.rid}`)
        .then(res => {
          store.commit('addPlayerList', {
            song_name: song.name,
            author: song.artist,
            url: res.data.url,
            duration: song.songTimeMinutes,
            mark: 1,
            rid: song.rid,
          })
        })
    }
    onMounted(() => {
      state.search_text = store.getters.getSearchText
      starSearch()
    })
    return { state, starSearch, PLAY }
  },
})
</script>

<style scoped lang="scss">
#search {
  width: 980px;
  padding: 40px;
  background: #f5f5f5;
  margin: 0 auto;
  .search_box {
    width: 100%;
    display: flex;
    justify-content: center;
    label {
      position: relative;
      display: block;
      input {
        outline: none;
        padding-left: 20px;
        padding-right: 40px;
        height: 40px;
        width: 420px;
      }
      span {
        position: absolute;
        display: inline-block;
        height: 100%;
        width: 38px;
        right: 0;
        top: 0;
        cursor: pointer;
        img {
          height: 38px;
          transform: scale(0.7);
        }
      }
    }
  }
  .result_count {
    color: #999;
    margin: 30px 0 20px 0;
  }
  .result {
    ul:first-child {
      display: block;
      user-select: none;
      li {
        display: inline-block;
        height: 40px;
        width: (100% / 7);
        line-height: 38px;
        border-top: 2px solid #ccc;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        &.active {
          background: #fff;
          border-top: 2px solid #c20c0c;
        }
        &:hover {
          border-top: 2px solid #c20c0c;
        }
      }
    }
    ul:last-child {
      margin-top: 20px;
      display: block;
      li {
        display: block;
        height: 40px;
        span {
          display: inline-block;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
          white-space: nowrap;
          padding: 0 8px;
          &:nth-child(1) {
            user-select: none;
            height: 40px;
            width: 40px;
            text-align: center;
            font-size: 15px;
            transform: rotate(90deg);
            color: #aeaeae;
            cursor: pointer;
          }
          &:nth-child(2) {
            width: 470px;
          }
          &:nth-child(3) {
            width: 130px;
          }
          &:nth-child(4) {
            width: 160px;
          }
          &:nth-child(5) {
            width: calc(100% - 800px);
            text-align: center;
          }
        }
        &:hover {
          background: #fff;
        }
      }
    }
  }
}
</style>
