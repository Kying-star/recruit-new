<!-- 前奏页面 -->
<template>
  <div class="prelude" @click="jumpto">
    <div :class="change ? prelude_img1 : prelude_img2"></div>
    <div v-show="!change" :class="stop ? `hand` : `handstop`"></div>
  </div>
</template>

<script>
import jump from '../utils/jump';
import judgeClient from '../utils/judgeClient';
export default {
  components: {},
  data () {
    return {
      prelude_img1: 'prelude_img1',
      prelude_img2: 'prelude_img2',
      mask_after: 'mask_after',
      change: true,
      show: true,
      stop: true,
    };
  },
  methods: {
    jumpto () {
      this.getGrant();
      //console.log('onclick');
      console.log(this);
      if (this.change == true) {
        return;
      }
      jump('/introduce', this);
    },
    getGrant () {
      if (this.is_ios()) {
        window.DeviceOrientationEvent.requestPermission().then(state => {
          switch (state) {
            case 'granted':
              break;
            case 'denied':
              alert('你拒绝了使用陀螺仪');
              break;
            case 'prompt':
              alert('其他行为');
              break;
          }
        });
      }
    },
    is_ios () {
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      } else {
        return false;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (judgeClient() == 'ios') {
      this.prelude_img1 = 'prelude_img1_ios';
      this.prelude_img2 = 'prelude_img2_ios';
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      this.change = false;
      // setTimeout(() => {
      //   this.show = false;
      // }, 2000);
      setTimeout(() => {
        this.stop = false;
      }, 1000);
    }, 1500);
  },
};
</script>
<style lang="scss" scoped>
$img1: '../assets/images/prelude/-e-Text effects@2x.png';
$img2: '../assets/images/prelude/--e-Text-effects@2x.png';
@function randomNum($max, $min: 0, $u: 1) {
  @return ($min + random($max)) * $u;
}
.prelude {
  width: 100vw;
  height: 1206px;

  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 999;
  .hand {
    position: absolute;
    width: 78px;
    height: 63px;
    margin-top: 375px;
    animation: show 1s linear;
    transform: translateX(32vw) translateY(37.333vw);
    background-image: url('../assets/images/loading/hand.png');
    background-size: cover;
    z-index: 100000;
  }
  .handstop {
    position: absolute;
    width: 78px;
    height: 63px;
    margin-top: 375px;
    transform: translateX(32vw) translateY(37.333vw);
    animation: bot 1s linear infinite;
    background-image: url('../assets/images/loading/hand.png');
    background-size: cover;
    z-index: 100000;
    &::before {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      background: aliceblue;
      opacity: 0.05;
      border-radius: 50%;
      animation: ripple1 1s linear infinite;
      animation-delay: 1s;
      transform: translateX(-50%) translateY(-50%);
    }
    &::after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      background: aliceblue;
      opacity: 0.1;
      border-radius: 50%;
      animation: ripple2 1s linear infinite;
      animation-delay: 1s;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  @keyframes ripple1 {
    0% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 100px;
      height: 100px;
    }
  }
  @keyframes ripple2 {
    0% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 50px;
      height: 50px;
    }
  }
  @keyframes bot {
    0% {
      transform: translateX(32vw) translateY(37.333vw) rotateZ(0deg);
    }
    100% {
      transform: translateX(32vw) translateY(37.333vw) rotateZ(0deg);
    }
  }

  @keyframes show {
    0% {
      transform: translateX(56vw) translateY(56vw);
    }
    100% {
      transform: translateX(32vw) translateY(37.333vw);
    }
  }
  .prelude_img1_ios {
    margin-top: 375px;
    position: relative;
    width: 488px;
    height: 223px;
    z-index: 1000;
    background-image: url($img1);
    background-size: cover;

    &::before {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }
    &::after {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }

    &::after {
      content: '';
      animation: glitch-three 3s infinite step-end;
      z-index: 2;
    }
    &::before {
      content: '';
      animation: glitch-four 3s infinite 1s step-end;
      z-index: 2;
    }
    z-index: 99999;
  }
  .prelude_img2_ios {
    position: relative;
    width: 488px;
    height: 223px;
    margin-top: 375px;
    background-image: url($img2);
    background-size: cover;

    &::before {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }
    &::after {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }

    &::after {
      content: '';
      //animation: glitch-one 3s infinite step-end;
      z-index: 2;
    }
    &::before {
      content: '';
      //animation: glitch-one 3s infinite 1s step-end;
      z-index: 2;
    }
    z-index: 999;
  }
  .prelude_img1 {
    position: relative;
    width: 488px;
    height: 223px;
    z-index: 1000;
    background-image: url($img1);
    background-size: cover;
    margin-top: 375px;
    &::before {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }
    &::after {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }

    &::after {
      content: '';
      animation: glitch-one 3s infinite step-end;
      z-index: 2;
    }
    &::before {
      content: '';
      animation: glitch-two 3s infinite 1s step-end;
      z-index: 2;
    }
    z-index: 99999;
  }
  .prelude_img2 {
    position: relative;
    width: 488px;
    height: 223px;
    margin-top: 375px;
    background-image: url($img2);
    background-size: cover;

    &::before {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }
    &::after {
      position: absolute;
      width: 488px;
      height: 223px;
      top: 0;
      left: 0;
      background: inherit;
    }

    &::after {
      content: '';
      animation: glitch-one 3s infinite step-end;
      z-index: 2;
    }
    &::before {
      content: '';
      animation: glitch-one 3s infinite 1s step-end;
      z-index: 2;
    }
    z-index: 999;
  }
  @keyframes glitch-one {
    3% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    6% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    9% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    12% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    15% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    18% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    21% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    24% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    27% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    30% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    33% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    36% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    39% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      opacity: 0;
    }
    42% {
      opacity: 0.5;
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      filter: hue-rotate(90deg) saturate(1.3);
    }
    45% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      filter: invert(1);
    }

    48% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    51% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }
    54% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.2);
    }
    57% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.3);
      filter: invert(0);
    }
    60% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }
    63% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.2);
      filter: none;
    }
    66% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.3);
    }
    69% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }
    72% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    75% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.2);
    }
    78% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    81% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }
    84% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }
    87% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.3);
      filter: hue-rotate(90deg) saturate(1.3);
    }
    90% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
      filter: none;
    }
    93% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
      filter: none;
    }
    96% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
      filter: none;
    }
    99% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
      filter: none;
    }
    100% {
      background-image: none;
    }
  }

  @keyframes glitch-two {
    20% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    20.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    21% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    21.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    22% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    22.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    23% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    23.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    24% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    24.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    25% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    25.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    26% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      opacity: 0;
    }
    45% {
      opacity: 0.3;
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      filter: hue-rotate(45deg) saturate(1.1);
    }
    45.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      filter: invert(1.2);
    }

    46% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    46.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.2);
    }
    47% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.3);
    }
    47.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.1);
      filter: invert(1.1);
    }
    48% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.2);
    }
    48.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.2);
      filter: none;
    }
    49% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.3);
    }
    49.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.1);
    }
    50% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    50.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.4);
    }
    51% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    51.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
    }
    52% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.1);
    }
    52.5% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.3);
      filter: hue-rotate(150deg) saturate(1.3);
    }
    54% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
      transform: scale(1.1);
      filter: none;
    }
    54% {
      background-image: none;
    }
  }
  @keyframes glitch-three {
    3% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    9% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    18% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    30% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    39% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      opacity: 0;
    }

    51% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }

    60% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }

    69% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }
    78% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    90% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
      filter: none;
    }

    100% {
      background-image: none;
    }
  }
  @keyframes glitch-four {
    3% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    9% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    18% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    30% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    39% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      opacity: 0;
    }

    51% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }

    60% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }

    69% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
    }
    78% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
    }

    90% {
      transform: translateX(#{randomNum(100, -50)}px);
      clip-path: inset(#{randomNum(60, 20)}px 0 #{randomNum(100, 20)}px);
      transform: scale(1.1);
      filter: none;
    }

    100% {
      background-image: none;
    }
  }
}
</style>
