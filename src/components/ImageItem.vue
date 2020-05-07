<template>
  <div
    class="wrap"
    :style="{
      width: imageSize.width + '%',
      height: imageSize.height + '%',
      backgroundImage: 'url(' + img.url + ')'
    }"
    :class="{ selected: selected }"
  >
    <div class="value">{{ img.id }}</div>
    <div class="up" @click="changeImgStartIndex('up')">向上</div>
    <div class="down" @click="changeImgStartIndex('down')">向下</div>
    <template v-if="imgList.length > 0 && selected">
      <div
        v-for="img in list"
        :key="img.id"
        class="img"
        :style="{
          width: img.width + '%',
          height: img.height + '%',
          backgroundImage: 'url(' + img.url + ')'
        }"
      >
        {{ img.id }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
    img: Object,
    imageSize: Object,
    imgList: Array,
    imgLength: {
      type: Number,
      default: 4
    }
  },
  computed: {
    list() {
      return this.imgList.slice(
        this.startIndex,
        this.startIndex + this.imgLength
      );
    }
  },
  data() {
    return {
      startIndex: 0
    };
  },
  mounted() {},
  methods: {
    changeImgStartIndex(type) {
      let newIndex = 0;
      if (type === "up") {
        newIndex = this.startIndex - this.imgLength;
      }

      if (type === "down") {
        newIndex = this.startIndex + this.imgLength;
      }
      if (newIndex < 0 || newIndex > 100) {
        return;
      }
      this.startIndex = newIndex;
    }
  }
};
</script>

<style>
.wrap {
  position: relative;
}
.value {
  top: 10px;
  left: 10px;
  position: absolute;
}
.img.selected {
  color: blue;
}
.wrap .up {
  top: 30px;
  left: 10px;
  position: absolute;
}

.wrap .down {
  top: 50px;
  left: 10px;
  position: absolute;
}
</style>
