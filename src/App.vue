<template>
  <div id="app">
    <div class="left">
      <div
        v-for="(item, index) in imageData"
        :key="index"
        class="btn"
        :class="{ selected: index == selectedImageDataIndex }"
        @click="changeImgData(index)"
      >
        {{ index + 1 }}
      </div>
      <div class="up" @click="changeImgStartIndex('up')">向上</div>
      <div class="down" @click="changeImgStartIndex('down')">向下</div>
    </div>
    <div class="right">
      <div class="top">
        <div
          v-for="(item, index) in navList"
          :key="index"
          class="nav"
          :class="{ selected: index == selectedNavIndex }"
          @click="changeSize(item, index)"
        >
          {{ item.colNum + "X" + item.rowNum }}
        </div>
      </div>
      <scroll
        class="main"
        :barWrapHeight="selectImageData.length"
        :windowHeight="imageLength"
        :barTopHeight="startIndex"
        @prev="changeImgStartIndex('up')"
        @next="changeImgStartIndex('down')"
      >
        <image-item
          v-for="img in imgList"
          :key="img.id"
          class="img"
          :img="img"
          :image-size="imageSize"
          :image-length="imageLength"
          :image-data="selectImageData"
          :selected="img.selected"
          @click="selectImageItem(img)"
        ></image-item>
      </scroll>
    </div>
  </div>
</template>

<script>
import ImageItem from "./components/ImageItem.vue";
import Scroll from "./components/Scroll.vue";

import imageData from "./mockData";
export default {
  name: "App",
  components: {
    ImageItem,
    Scroll
  },
  data() {
    return {
      imageData, // 图片数据
      selectedImageDataIndex: 0, // 选中的图片数据index
      // 导航
      navList: [
        {
          colNum: 2, // 列数
          rowNum: 2 // 行数
        },
        {
          colNum: 2,
          rowNum: 3
        },
        {
          colNum: 3,
          rowNum: 4
        },
        {
          colNum: 4,
          rowNum: 4
        }
      ],
      selectedNavIndex: 0, // 选中的导航 index
      startIndex: 0 // 开始的index
    };
  },
  computed: {
    imageSize() {
      let selectedNav = this.navList[this.selectedNavIndex];
      let width = 100 / selectedNav.colNum;
      let height = 100 / selectedNav.rowNum;
      return {
        width,
        height
      };
    },
    imageLength() {
      let selectedNav = this.navList[this.selectedNavIndex];
      return selectedNav.colNum * selectedNav.rowNum;
    },
    selectImageData() {
      return this.imageData[this.selectedImageDataIndex];
    },
    imgList() {
      return this.selectImageData.slice(
        this.startIndex,
        this.startIndex + this.imageLength
      );
    }
  },
  methods: {
    changeImgData(index) {
      this.selectedImageDataIndex = index;
      this.startIndex = 0;
    },
    changeSize(item, selectedNavIndex) {
      this.selectedNavIndex = selectedNavIndex;
    },
    changeImgStartIndex(type) {
      let newIndex = 0;
      if (type === "up") {
        newIndex = this.startIndex - this.imageLength;
      }

      if (type === "down") {
        newIndex = this.startIndex + this.imageLength;
      }
      if (newIndex < 0 || newIndex > this.selectImageData.length) {
        return;
      }
      this.startIndex = newIndex;
    },
    selectImageItem(imgItem) {
      imgItem.selected = !imgItem.selected;
    }
  }
};
</script>

<style lang="less">
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  display: flex;
  height: 100vh;
}
.left {
  width: 200px;
  height: 100%;
  background: green;
  padding: 20px;
  box-sizing: border-box;
  .btn {
    width: 20px;
    height: 20px;
    margin-bottom: 10px;
    border: 1px solid;
  }
}

.selected {
  color: red;
}
.right {
  flex: 1;
  flex-direction: column;
  display: flex;
  height: 100%;
  .top {
    padding: 20px;
    height: 50px;
    background: blue;
    .nav {
      width: 40px;
      height: 20px;
      margin-right: 10px;
      border: 1px solid;
      display: inline-block;
    }
  }
  .main {
    height: 0;
    flex: 1;
    .img {
      float: left;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}
</style>
