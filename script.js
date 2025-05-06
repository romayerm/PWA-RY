let data = [];
let currentIndex = 0;

const img = document.getElementById("soundImage");
const title = document.getElementById("soundTitle");
const desc = document.getElementById("description");
const playButton = document.getElementById("playButton");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateDisplay() {
  const item = data[currentIndex];
  img.src = item.image;
  title.innerText = item.title;
  desc.innerText = item.text;
}

playButton.onclick = () => {
  const audio = new Audio(data[currentIndex].audio);
  audio.play();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  updateDisplay();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % data.length;
  updateDisplay();
};

// Fetch data from topics.json and initialize
fetch("topics.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    updateDisplay();
  });
