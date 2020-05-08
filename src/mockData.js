let imageData = [];
let imgArr = [
  "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1280325423,1024589167&fm=26&gp=0.jpg",
  "https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1189779147,4248115718&fm=202&mola=new&crop=v1",
  "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
  "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=888206991,1760071208&fm=191&app=48&size=h300&n=0&g=4n&f=JPEG?sec=1853310920&t=cc5d57a46142087a2aa2124099bc6eec"
];
imgArr.forEach(imgUrl => {
  let data = [];
  for (let index = 0; index < 100; index++) {
    data.push({
      id: index + 1,
      url: imgUrl,
      selected: false
    });
  }
  imageData.push(data);
});

export default imageData;
