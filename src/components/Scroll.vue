<template>
  <div
    class="scroll"
    @mousewheel.stop="mousewheel"
    @mousemove.stop.prevent="onBarMouseMove"
    @mouseup.stop.prevent="onBarMouseUp"
  >
    <slot />
    <div class="scroll-bar">
      <div class="perv" @click="prev">▲</div>
      <div class="bar-wrap">
        <div
          class="bar"
          :style="{ height: barHeight, top: barTop }"
          @mousedown.stop.prevent="onBarMouseStart"
          ref="bar"
        ></div>
      </div>
      <div class="next" @click="next">▼</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barWrapHeight: Number, // 导航条外框长度
    windowHeight: Number, // 一页的长度
    barTopHeight: Number // 导航条距离顶部的长度
  },
  data() {
    return {
      touch: {
        y1: 0,
        y2: 0,
        force: false
      }
    };
  },
  computed: {
    barHeight() {
      return (this.windowHeight / this.barWrapHeight) * 100 + "%";
    },
    barTop() {
      return (this.barTopHeight / this.barWrapHeight) * 100 + "%";
    }
  },
  methods: {
    mousewheel(e) {
      e.deltaY > 0 ? this.next() : this.prev();
    },
    prev() {
      if (this.barTopHeight < this.windowHeight) {
        return;
      }
      this.$emit("prev");
    },
    next() {
      if (this.barTopHeight > this.barWrapHeight - this.windowHeight) {
        return;
      }
      this.$emit("next");
    },
    onBarMouseStart(e) {
      this.touch.force = true;
      this.touch.y1 = e.pageY;
    },
    onBarMouseMove(e) {
      if (!this.touch.force) {
        return;
      }
      this.touch.y2 = e.pageY;

      let barHeight = this.$refs.bar.offsetHeight;
      if (this.touch.y2 - this.touch.y1 >= barHeight) {
        this.touch.y1 = this.touch.y2;
        this.next();
      }
      if (this.touch.y2 - this.touch.y1 <= -barHeight) {
        this.touch.y1 = this.touch.y2;
        this.prev();
      }
    },
    onBarMouseUp() {
      if (!this.touch.force) {
        this.$emit("click");
      }
      this.touch.force = false;
    }
  }
};
</script>

<style lang="less" scoped>
.scroll {
  height: 100%;
  position: relative;
  .scroll-bar {
    position: absolute;
    width: 20px;
    background: rgba(255, 255, 255, 0.5);
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bar-wrap {
      flex: 1;
      width: 20px;
      position: relative;
      .bar {
        position: absolute;
        height: 20px;
        width: 20px;
        background: #000;
      }
    }
  }
}
</style>
