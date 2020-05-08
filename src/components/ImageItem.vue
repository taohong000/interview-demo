<template>
  <div
    class="wrap"
    :style="{
      width: imageSize.width + '%',
      height: imageSize.height + '%'
    }"
  >
    <scroll
      v-if="selected"
      :barWrapHeight="imageData.length"
      :windowHeight="imageLength"
      :barTopHeight="startIndex"
      @prev="changeImgStartIndex('up')"
      @next="changeImgStartIndex('down')"
      @click="onClick"
    >
      <div
        v-for="img in list"
        :key="img.id"
        class="img"
        :style="{
          width: imageSize.width + '%',
          height: imageSize.height + '%',
          backgroundImage: 'url(' + img.url + ')'
        }"
      >
        {{ img.id }}
      </div>
    </scroll>
    <div v-else class="image-wrap" @click="onClick">
      <img :src="img.url" />
      <div class="value">{{ img.id }}</div>
    </div>
  </div>
</template>

<script>
import Scroll from "./Scroll.vue";
export default {
  components: {
    Scroll
  },
  props: {
    selected: Boolean, // 是否选中
    img: Object, // 图片对象
    imageSize: Object, // 图像尺寸
    imageData: Array, // 图片数据
    imageLength: Number // 显示图片长度
  },
  computed: {
    list() {
      return this.imageData.slice(
        this.startIndex,
        this.startIndex + this.imageLength
      );
    }
  },
  data() {
    return {
      startIndex: 0 // 开始的index
    };
  },
  methods: {
    // 改变展示图像
    changeImgStartIndex(type) {
      let newIndex = 0;
      if (type === "up") {
        newIndex = this.startIndex - this.imageLength;
      }

      if (type === "down") {
        newIndex = this.startIndex + this.imageLength;
      }
      if (newIndex < 0 || newIndex > this.imageData.length) {
        return;
      }
      this.startIndex = newIndex;
    },
    // 点击事件
    onClick() {
      this.$emit("click");
    }
  },
  watch: {
    imageData() {
      // 重置图片开始index
      this.startIndex = 0;
    }
  }
};
</script>

<style lang="less">
.wrap {
  position: relative;
  .image-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .value {
      top: 10px;
      left: 10px;
      position: absolute;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
