<!-- palyer -->
<template>
  <div
    id="player"
    :class="{ active: state.player_show }"
    @mouseenter="state.player_show = true"
    @mouseleave="closePlayer($event)"
  >
    <div class="playerSet">
      <span
        title="上一曲"
        @click="
          changeSong(
            --state.player_target < 0
              ? state.player_list.length - 1
              : state.player_target
          )
        "
      >
        <img :src="state.imgs.pre"
      /></span>
      <span title="播放/暂停" @click="PLAY($event)">
        <img :src="state.player_status ? state.imgs.pase : state.imgs.play"
      /></span>
      <span
        title="下一曲"
        @click="changeSong(++state.player_target % state.player_list.length)"
      >
        <img :src="state.imgs.next"
      /></span>
    </div>
    <div class="songInfo">
      <span class="songImge">{{
        state.player_list[state.player_target].song_name[0]
      }}</span>
      <div class="barArea">
        <section class="info">
          <span>{{ state.player_list[state.player_target].song_name }}</span>
          <span>{{ state.player_list[state.player_target].author }}</span>
        </section>
        <section class="bar" ref="musicBar">
          <div class="barFlag">
            <span class="tap" @mousedown="setCurrentTime($event)"></span>
            <span class="curBar"></span>
          </div>
          <div class="timeLine"><span>00:00</span>/<span>00:00</span></div>
        </section>
      </div>
    </div>
    <div class="fun1">
      <span><img :src="state.imgs.star"/></span>
      <span><img :src="state.imgs.share"/></span>
    </div>
    <div class="fun2">
      <span
        ><img
          :src="state.imgs.sound"
          @click="state.volume_show = !state.volume_show"
        />
        <div :class="{ control: true, able: state.volume_show }">
          <section>
            <span @mousedown="setVolume($event)"></span>
          </section>
        </div>
      </span>
      <span title="单曲循环"><img :src="state.imgs.status1"/></span>
      <span
        ><img
          :src="state.imgs.playlist"
          @click="state.pane_show = !state.pane_show"
          title="播放列表"
      /></span>
      <span
        ><img
          :src="state.player_lock ? state.imgs.lock : state.imgs.unlock"
          @click="state.player_lock = !state.player_lock"
          :title="state.player_lock ? '解锁播放栏' : '锁定播放栏'"
      /></span>
    </div>
    <div :class="{ pane: true, able: state.pane_show }">
      <section class="list">
        <div class="head">
          <span>播放列表</span>
        </div>
        <ul>
          <li
            v-for="(item, index) in state.player_list"
            :key="index"
            @click="changeSong(index)"
          >
            <span :class="{ active: state.player_target == index }">▲</span>
            <span>{{ item.song_name }}</span>
            <span></span>
            <span :title="item.author">{{ item.author }}</span>
            <span>{{ item.duration }}</span>
            <span>F</span>
          </li>
        </ul>
      </section>
      <section class="lyric">
        <div class="head">
          <span>{{ state.player_list[state.player_target].song_name }}</span>
          <span
            @click="state.pane_show = !state.pane_show"
            :class="{ disable: !state.pane_show }"
            ><img :src="state.imgs.close"
          /></span>
        </div>
      </section>
    </div>
    <div class="active_bar"></div>
    <audio controls ref="musicPlayer"></audio>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const musicPlayer = ref(null)
    const musicBar = ref(null)
    let time2 = null
    let time1 = null
    let barFlagSpan = null
    let barFlagCur = null
    const state = reactive({
      imgs: {
        pre: require('@/assets/svg/pre.svg'),
        play: require('@/assets/svg/play.svg'),
        next: require('@/assets/svg/next.svg'),
        pase: require('@/assets/svg/pase.svg'),
        sound: require('@/assets/svg/sound.svg'),
        status1: require('@/assets/svg/status1.svg'),
        playlist: require('@/assets/svg/playlist.svg'),
        star: require('@/assets/svg/star.svg'),
        share: require('@/assets/svg/share.svg'),
        close: require('@/assets/svg/close.svg'),
        lock: require('@/assets/svg/lock.svg'),
        unlock: require('@/assets/svg/unlock.svg'),
      },
      player_status: false,
      player_show: true,
      player_lock: true,
      player_bar_moving: true,
      player_list: [
        {
          song_name: 'Shelter',
          author: 'Porter Robinson',
          duration: '03:54',
          url:
            'https://sq-sycdn.kuwo.cn/a926b5618089f47dad16ed47ac2a67c7/5ff95eef/resource/n3/17/3/3450935135.mp3',
          mark: 1,
        },
        {
          song_name: 'Hanezeve Caradhina',
          author: 'Kevin Penkin',
          duration: '03:21',
          url:
            'https://nx01-sycdn.kuwo.cn/883ecb762a00b368894a962bf7063d1f/5ff947c4/resource/n2/33/45/733301250.mp3',
          mark: 1,
        },
        {
          song_name: 'China-X',
          author: '徐梦圆',
          duration: '03:46',
          url:
            'https://eq-sycdn.kuwo.cn/33c23094ad400ed2f196fe8a6625af18/5ff95062/resource/n2/60/76/2212019226.mp3',
          mark: 1,
        },
      ],
      player_target: 0,
      pane_show: false,
      volume_show: false,
      volume: 1,
    })
    const closePlayer = function(e) {
      if (!state.player_lock && state.player_show && !state.pane_show) {
        setTimeout(() => {
          if (!state.player_lock) state.player_show = false
        }, 2000)
      }
    }
    const transF = function(secs) {
      let hr = Math.floor(secs / 3600)
      let min = Math.floor((secs - hr * 3600) / 60)
      let sec = Math.floor(secs - hr * 3600 - min * 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      return min + ':' + sec
    }
    const PLAY = function(e) {
      let PLAYER = musicPlayer.value
      if (!!!PLAYER) return
      time2.innerText = state.player_list[state.player_target].duration
      if (PLAYER.paused) {
        PLAYER.play()
        state.player_status = true
      } else {
        PLAYER.pause()
        state.player_status = false
      }
      PLAYER.ontimeupdate = function() {
        let move = 500 * (PLAYER.currentTime / PLAYER.duration)
        if (state.player_bar_moving) {
          time1.innerText = transF(PLAYER.currentTime)
          barFlagSpan.style.left = move - 8 + 'px'
          barFlagCur.style.width = move + 'px'
        }
        if (PLAYER.ended) {
          PLAYER.currentTime = 0
          state.player_status = false
        }
      }
    }
    const changeSong = function(index) {
      let PLAYER = musicPlayer.value
      if (!!!PLAYER) return
      state.player_target = index
      PLAYER.src = state.player_list[state.player_target].url
      time2.innerText = state.player_list[state.player_target].duration
      state.player_status = true
      PLAYER.play()
    }
    const setVolume = function(e) {
      let odiv = e.target
      let disY = e.clientY - odiv.offsetTop
      document.onmousemove = e => {
        let top = e.clientY - disY
        if (top <= -9) top = -9
        if (top >= 81) top = 81
        musicPlayer.value.volume = 1 - (top + 9) / 90
        odiv.style.top = top + 'px'
      }
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    const setCurrentTime = function(e) {
      let odiv = e.target
      let disX = e.clientX - odiv.offsetLeft
      let cTime = 0
      let PLAYER = musicPlayer.value
      if (!!!PLAYER) return
      state.player_bar_moving = false
      document.onmousemove = e => {
        let left = e.clientX - disX
        if (left <= -8) left = -8
        if (left >= 492) left = 492
        cTime = ((left + 8) / 500) * (!!!PLAYER.duration ? 0 : PLAYER.duration)
        odiv.style.left = left + 'px'
        barFlagCur.style.width = left + 8 + 'px'
        time1.innerText = transF(cTime)
      }
      document.onmouseup = e => {
        state.player_bar_moving = true
        PLAYER.currentTime = cTime
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    onMounted(() => {
      time2 = musicBar.value.querySelector('.timeLine span:nth-child(2)')
      time1 = musicBar.value.querySelector('.timeLine span:nth-child(1)')
      barFlagSpan = musicBar.value.querySelector('span.tap')
      barFlagCur = musicBar.value.querySelector('span.curBar')
      closePlayer()
      if (!!musicPlayer) {
        musicPlayer.value.volume = state.volume
        musicPlayer.value.src = state.player_list[state.player_target].url
      }
    })
    return {
      state,
      musicPlayer,
      musicBar,
      closePlayer,
      PLAY,
      setVolume,
      setCurrentTime,
      changeSong,
    }
  },
})
</script>

<style scoped lang="scss">
#player {
  position: fixed;
  bottom: -50px;
  width: 100%;
  height: 50px;
  background: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.5s;
  .playerSet {
    display: flex;
    user-select: none;
    margin-right: 10px;
    span {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 50px;
      img {
        height: 45px;
        padding: 5px 0;
      }
      &:first-child img,
      &:last-child img {
        transform: scale(0.8);
      }
    }
  }
  .songInfo {
    width: 640px;
    display: flex;
    span.songImge {
      display: block;
      height: 40px;
      width: 40px;
      background: #ecf0f1;
      color: #333;
      line-height: 40px;
      text-align: center;
      font-size: 2rem;
      flex-shrink: 0;
      margin-right: 20px;
      user-select: none;
    }
    .barArea {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 580px;
      .info {
        span {
          display: inline-block;
          line-height: 100%;
          color: #9b9b9b;
          &:first-child {
            font-size: 13px;
            color: #e8e8e8;
            margin-right: 10px;
          }
        }
      }
      .bar {
        display: flex;
        align-items: center;
        user-select: none;
        .barFlag {
          position: relative;
          height: 10px;
          width: 500px;
          border-radius: 5px;
          background: #333;
          background-position: 0px;
          flex-shrink: 0;
          z-index: 1;
          span.tap {
            position: absolute;
            left: -8px;
            top: -2.6px;
            display: block;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            z-index: 3;
            &::after {
              position: absolute;
              content: '';
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              height: 8px;
              width: 8px;
              border-radius: 50%;
              background: #d61218;
            }
          }
          span.curBar {
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;
            background: #d61218;
            border-radius: 5px;
            z-index: 2;
          }
        }
        .timeLine {
          margin-left: 10px;
          width: 80px;
          color: #999;
        }
      }
    }
  }
  .fun1,
  .fun2 {
    height: 100%;
    display: flex;
    align-items: center;
    user-select: none;
    span {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      margin: 0 5px;
      img {
        cursor: pointer;
        height: 20px;
      }
    }
  }
  .fun1 {
    margin-left: 30px;
  }
  .fun2 {
    margin-left: 20px;
    transition: 0.3s;
    span:first-child .control {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: -120px;
      width: 30px;
      height: 120px;
      background: #3a393e;
      z-index: 2;
      visibility: hidden;
      opacity: 0;
      transition: 0.3s;
      section {
        position: relative;
        height: 90px;
        width: 5px;
        background: #000;
        border-radius: 10px;
        span {
          position: absolute;
          left: -2px;
          top: -9px;
          margin: 0;
          display: block;
          transform: translateY(50%);
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
        }
      }
      &.able {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .pane {
    position: absolute;
    width: 980px;
    height: 300px;
    background: #272728;
    left: calc(50% - 10px);
    top: 0;
    transform: translate(-50%, -103%);
    display: flex;
    transition: 0.2s;
    visibility: hidden;
    opacity: 0;
    .list,
    .lyric {
      position: relative;
      height: 100%;
      flex-shrink: 0;
      & .head {
        height: 40px;
        width: 100%;
        line-height: 40px;
        background: #3a393e;
        padding-left: 20px;
        span {
          display: block;
          color: #e2e2e2;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .list {
      width: 550px;
      border-right: 5px solid #202020;
      ul {
        height: calc(100% - 40px);
        overflow: auto;
        li {
          display: block;
          height: 30px;
          width: 100%;
          cursor: pointer;
          span {
            display: inline-block;
            height: 100%;
            line-height: 30px;
            color: #ccc;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;
            &:nth-child(1) {
              width: 30px;
              color: #c20c0c;
              transform: rotate(90deg);
              visibility: hidden;
              opacity: 0;
              transition: 0.3s;
              &.active {
                visibility: visible;
                opacity: 1;
              }
            }
            &:nth-child(2) {
              width: 260px;
              font-size: 13px;
              text-align: left;
            }
            &:nth-child(3) {
              width: calc(100% - 445px);
            }
            &:nth-child(4) {
              width: 70px;
              margin-left: 10px;
            }
            &:nth-child(5) {
              width: 35px;
              margin-left: 10px;
            }
            &:nth-child(6) {
              width: 30px;
            }
          }
          &:hover {
            background: #242424;
            span:not(:first-child) {
              color: #fff;
            }
          }
        }
      }
    }
    .lyric {
      width: 430px;
      .head {
        padding-left: 40px;
        display: flex;
        justify-content: center;
        span:first-child {
          flex-grow: 1;
          text-align: center;
        }
        span:last-child {
          width: 40px;
          cursor: pointer;
          &.disable {
            pointer-events: none;
          }
        }
        img {
          width: 100%;
          transform: scale(0.3);
        }
      }
    }
    &.able {
      transform: translate(-50%, -100%);
      visibility: visible;
      opacity: 1;
    }
  }
  .active_bar {
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 15px;
    background: transparent;
  }
  &.active {
    bottom: 0;
  }
  audio {
    display: none;
  }
}
</style>
