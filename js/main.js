const IMG_URL = "./images/paper.jpg";
const BG_DIM = { percLeft: 17, percRight: 17, percTop: 52, percTextSize: 10 };
const TEXTS = [
  {
    delayBefore: 1500,
    text: "Я – Дело.",
    aftermath: (selector) => {
      selector.innerHTML = `<a href="">${selector.innerText}</a>`;
    },
    delayAftermath: 2000,
    attributes: { style: "margin-left: 27.2589129164231%;" },
  },
  {
    delayBefore: 1000,
    text: "Я приблизилось.",
    aftermath: (selector) => {
      selector.innerHTML = selector.innerText;
    },
    attributes: { style: "margin-left: 7.41963763880772%;" },
  },
  {
    delayBefore: 500,
    text: "Давай посмотрим,",
    aftermath: (selector) => {
      selector.innerHTML = selector.innerText;
    },
    attributes: { style: "margin-left: 3.55347749853887%;" },
  },
  {
    delayBefore: 500,
    text: "что да как?",
    aftermath: (selector) => {
      selector.innerHTML = `<a href="https://t.me/szysztof">${selector.innerText}</a>`;
    },
    delayAftermath: 1200,
    attributes: { style: "margin-left: 22.4050263004091%;" },
  },
];
const DELAY_LETTERS = 100;

const beforeLoad = Date.now();
const background = document.querySelector("#background");
const img = new Image();
img.src = IMG_URL;

img.addEventListener("load", () => {
  console.log(Date.now() - beforeLoad);
  background.style.backgroundImage = `url("${IMG_URL}")`;
  background.style.maxWidth = `${img.width}px`;
  background.style.maxHeight = `${img.height}px`;
  background.style.animationPlayState = "running";
  setTextDim();
  animateString([...TEXTS], background, DELAY_LETTERS);

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

function animateString(string, selector, delayLetters, index = 0) {
  if (index >= string.length) {
    if (Array.isArray(string))
      string.forEach((obj) => {
        if (obj.aftermath) {
          if (obj.delayAftermath) {
            setTimeout(() => {
              obj.aftermath(obj.selector);
            }, obj.delayAftermath);
          } else {
            obj.aftermath(obj.selector);
          }
        }
      });
    return;
  }

  if (Array.isArray(string)) {
    const { text, delayBefore, attributes } = string[index];
    const p = document.createElement("p");
    if (attributes)
      Object.entries(attributes).forEach(([key, value]) => {
        p.setAttribute(key, value);
      });
    selector.append(p);
    string[index].selector = p;
    setTimeout(animateString, delayBefore, text, p, delayLetters);
    setTimeout(
      animateString,
      delayBefore + delayLetters * text.length,
      string,
      selector,
      delayLetters,
      index + 1
    );
  } else if (typeof string === "string") {
    if (string[index] === " ") selector.insertAdjacentHTML("beforeend", " ");
    else {
      const span = document.createElement("span");
      span.innerText = string[index];
      selector.append(span);
    }
    setTimeout(
      animateString,
      delayLetters,
      string,
      selector,
      delayLetters,
      index + 1
    );
  }
}
