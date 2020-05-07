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
          :key="item"
          class="nav"
          :class="{ selected: index == selectedNavIndex }"
          @click="changeSize(item, index)"
        >
          {{ item.colNum + "X" + item.rowNum }}
        </div>
      </div>
      <div class="main">
        <image-item
          v-for="img in imgList"
          :key="img.id"
          class="img"
          :img="img"
          :image-size="imageSize"
          :imgLength="imageLength"
          :imgList="childImgList"
          @click.native="selectImageItem(img)"
          :selected="img.id == selectedImgId"
        ></image-item>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  </div>
</template>

<script>
import ImageItem from "./components/ImageItem.vue";
import imageData from "./mockData";
export default {
  name: "App",
  components: {
    ImageItem
  },
  data() {
    return {
      imageData,
      selectedImageDataIndex: 0,
      navList: [
        {
          colNum: 2,
          rowNum: 2
        },
        {
          colNum: 2,
          rowNum: 3
        }
      ],
      selectedNavIndex: 0,
      startIndex: 0,
      imageLength: 4,

      selectedImgId: 0,
      imgList: [],
      childImgList: []
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
    showImageLength() {
      let selectedNav = this.navList[this.selectedNavIndex];
      return selectedNav.colNum * selectedNav.rowNum;
    }
  },
  mounted() {
    this.initImageList();
  },
  methods: {
    initImageList() {
      const selectImgData = this.imageData[this.selectedImageDataIndex];
      console.log(selectImgData);
      this.imgList = selectImgData.slice(
        this.startIndex,
        this.startIndex + this.showImageLength
      );
    },
    changeImgData(index) {
      this.selectedImageDataIndex = index;
      this.initImageList();
      this.initChildImageList();
    },
    changeSize(item, selectedNavIndex) {
      this.selectedNavIndex = selectedNavIndex;
      this.startIndex = 0;
      this.initImageList();

      for (let index = 0; index < this.imgList.length; index += 1) {
        const img = this.imgList[index];
        img.width = item.width;
        img.height = item.height;
      }
      this.initChildImageList();
    },
    changeImgStartIndex(type) {
      let newIndex = 0;
      if (type === "up") {
        newIndex = this.startIndex - this.showImageLength;
      }

      if (type === "down") {
        newIndex = this.startIndex + this.showImageLength;
      }
      console.log(newIndex);
      if (newIndex < 0 || newIndex > 100) {
        return;
      }
      this.startIndex = newIndex;
      console.log("this.startIndex", this.startIndex);
      this.initImageList();
    },
    selectImageItem(img) {
      this.selectedImgId = img.id;
      console.log(this.selectedImgId);
      this.initChildImageList();
    },
    initChildImageList() {
      const selectImgData = this.imageData[this.selectedImageDataIndex];
      this.childImgList = selectImgData;

      const selectedNav = this.navList[this.selectedNavIndex];
      for (let index = 0; index < this.childImgList.length; index += 1) {
        const img = this.childImgList[index];
        img.width = selectedNav.width;
        img.height = selectedNav.height;
      }
    }
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100vh;
}
#app {
  display: flex;
  height: 100%;
}
.left {
  width: 200px;
  height: 100%;
  background: green;
  padding: 20px;
  box-sizing: border-box;
}
.btn {
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
  border: 1px solid;
}
.selected {
  color: red;
}
.right {
  flex: 1;
  flex-direction: column;
  display: flex;
  height: 100%;
}
.top {
  padding: 20px;
  height: 50px;
  background: blue;
}
.nav {
  width: 40px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid;
  display: inline-block;
}
.main {
  height: 0;
  flex: 1;
  background: red;
}
.img {
  color: red;
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
