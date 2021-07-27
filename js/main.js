const IMG_URL = "../images/paper.jpg";
const BG_DIM = { percLeft: 17, percRight: 17, percTop: 52, percTextSize: 10 };

const beforeLoad = Date.now();
const background = document.querySelector("#background");
const img = new Image();
img.src = IMG_URL;

img.addEventListener("load", () => {
  console.log(Date.now() - beforeLoad);
  background.style.backgroundImage = `url("${IMG_URL.slice(1)}")`;
  background.style.maxWidth = `${img.width}px`;
  background.style.maxHeight = `${img.height}px`;
  background.style.animationPlayState = "running";
  setTextDim();

  if (window.ResizeObserver) {
    new ResizeObserver(setTextDim).observe(background);
  } else {
    window.onresize = setTextDim;
  }
});

function setTextDim() {
  const { width, height, x, y } = new BgActualSize();
  background.style.paddingLeft = `${(BG_DIM.percLeft / 100) * width + x}px`;
  background.style.paddingRight = `${(BG_DIM.percRight / 100) * width + x}px`;
  background.style.paddingTop = `${(BG_DIM.percTop / 100) * height + y}px`;
  background.style.fontSize = `${(BG_DIM.percTextSize / 100) * height}px`;
}

function BgActualSize() {
  const bgWidth = background.clientWidth;
  const bgHeight = background.clientHeight;

  const natWidth = bgWidth < img.width ? bgWidth : img.width;
  const natHeight = bgHeight < img.height ? bgHeight : img.height;

  const compWidth = (natHeight / img.height) * img.width;
  const compHeight = (natWidth / img.width) * img.height;

  if (compWidth < natWidth) {
    this.width = compWidth;
    this.height = natHeight;
  } else {
    this.width = natWidth;
    this.height = compHeight;
  }

  this.x = (bgWidth - this.width) / 2;
  this.y = (bgHeight - this.height) / 2;
}

function animateStrings() {}
