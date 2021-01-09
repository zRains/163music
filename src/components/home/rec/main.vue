<!-- main -->
<template>
  <div id="main">
    <section class="content_l">
      <div class="intr">
        <span>热门推荐</span>
        <ul>
          <li>华语</li>
          <li>流行</li>
          <li>摇滚</li>
          <li>民谣</li>
          <li>电子</li>
        </ul>
        <span>更多</span>
      </div>
      <div class="part-1">
        <div class="sheet">
          <img :src="state.imgs.sheet1" />
          <span>据我所知，这是他献给男朋友的歌。</span>
        </div>
        <div class="sheet">
          <img :src="state.imgs.sheet2" />
          <span>Good Time | 萤火虫 | 编辑中</span>
        </div>
        <div class="sheet">
          <img :src="state.imgs.sheet3" />
          <span>精选｜评论10w+单曲循环歌曲</span>
        </div>
        <div class="sheet">
          <img :src="state.imgs.sheet4" />
          <span>复古系|光怪陆离的幻想之旅</span>
        </div>
      </div>
    </section>
    <section class="content_r">
      <div class="login">
        <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
        <span>用户登录</span>
      </div>
      <div class="inSinger">
        <div class="intr">
          <span>创建团队</span>
          <span>查看全部</span>
        </div>
        <ul class="creators">
          <li>
            <img :src="state.imgs.me" />
            <div class="info">
              <span>zRain</span>
              <span>无聊的旅行者</span>
            </div>
          </li>
          <li>
            <img :src="state.imgs.lqc" />
            <div class="info">
              <span>室长</span>
              <span>史上最非非酋</span>
            </div>
          </li>
          <li>
            <img :src="state.imgs.xsh" />
            <div class="info">
              <span>书豪</span>
              <span>来自不同次元的人</span>
            </div>
          </li>
          <li>
            <img :src="state.imgs.hlh" />
            <div class="info">
              <span>团支书</span>
              <span>Leader</span>
            </div>
          </li>
          <li>
            <img :src="state.imgs.hxr" />
            <div class="info">
              <span>芮</span>
              <span>Liter ???</span>
            </div>
          </li>
          <li>
            <img :src="state.imgs.cyx" />
            <div class="info">
              <span>CYX</span>
              <span>????</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      imgs: {
        me: require('@/assets/img/me.jpg'),
        lqc: require('@/assets/img/lqc.jpg'),
        xsh: require('@/assets/img/xsh.jpg'),
        hlh: require('@/assets/img/hlh.jpg'),
        hxr: require('@/assets/img/hxr.jpg'),
        cyx: require('@/assets/img/cyx.jpg'),
        sheet1: require('@/assets/img/sheet1.jpg'),
        sheet2: require('@/assets/img/owl_city1.jpg'),
        sheet3: require('@/assets/img/owl_city2.jpg'),
        sheet4: require('@/assets/img/owl_city3.jpg'),
      },
    })
    return { state }
  },
})
</script>

<style scoped lang="scss">
#main {
  width: 980px;
  margin: 0 auto;
  display: flex;
  .content_l,
  .content_r {
    display: block;
  }
  .content_l {
    width: calc(100% - 250px);
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .content_l {
    background: #fff;
    .intr {
      position: relative;
      display: flex;
      height: 35px;
      width: calc(100% - 35px);
      margin-left: 35px;
      display: flex;
      span {
        display: inline-block;
        line-height: 35px;
        &:first-child {
          font-size: 20px;
          margin-right: 20px;
        }
        &:last-child {
          margin-left: auto;
        }
      }
      ul li {
        position: relative;
        display: inline-block;
        line-height: 35px;
        margin: 0 10px;
        color: #666;
        cursor: pointer;
        &:not(:last-child)::after {
          position: absolute;
          content: '';
          height: 15px;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          background: linear-gradient(90deg, #ccc 50%, transparent 50%);
        }
        &:hover {
          text-decoration: underline;
        }
      }
      &::before {
        position: absolute;
        content: '●';
        left: -35px;
        height: 100%;
        width: 35px;
        font-size: 30px;
        line-height: 30px;
        text-align: center;
        background: #c10d0c;
        color: #fff;
        border-radius: 50%;
        transform: scale(0.4);
      }
      &::after {
        position: absolute;
        content: '';
        width: calc(100% + 35px);
        transform: translateX(-35px);
        height: 2px;
        background: #c10d0c;
        bottom: 0;
      }
    }
    .part-1 {
      display: grid;
      grid-template-columns: repeat(4, 140px);
      grid-template-rows: repeat(2, 200px);
      column-gap: calc((100% - 560px) / 3);
      row-gap: 30px;
      margin-top: 20px;
      overflow: hidden;
      .sheet {
        background: #f3f3f3;
        img {
          height: 140px;
          width: 140px;
        }
        span {
          display: block;
          font-size: 14px;
          padding: 0 5px;
          margin-top: 5px;
        }
      }
    }
  }
  .content_r {
    width: 250px;
    .login {
      background: #f2f2f2;
      height: 130px;
      padding: 15px 20px;
      span:first-child {
        display: block;
        color: #666;
        line-height: 22px;
        margin-bottom: 20px;
      }
      span:last-child {
        display: block;
        height: 30px;
        width: 100px;
        line-height: 30px;
        text-align: center;
        background: #cb0d14;
        color: #fff;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    .inSinger {
      display: flex;
      flex-direction: column;
      padding: 15px;
      width: 100%;
      .intr {
        width: 100%;
        height: 25px;
        border-bottom: 1px solid #ccc;
        span {
          display: inline-block;
          font-weight: bold;
          line-height: 25px;
          &:last-child {
            float: right;
            font-weight: normal;
            color: #666;
          }
        }
      }
      ul.creators li {
        width: 100%;
        display: flex;
        margin-top: 15px;
        background: #f3f3f3;
        img {
          height: 62px;
          width: 62px;
          margin-right: 15px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          span {
            display: block;
            width: 100%;
            color: #666;
            &:first-child {
              color: #000;
              font-size: 14px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
