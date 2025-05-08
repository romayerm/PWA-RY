let data = [];
let currentIndex = 0;
let currentAudio = null;

const img = document.getElementById("soundImage");
const title = document.getElementById("soundTitle");
const desc = document.getElementById("description");
const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function updateDisplay() {
  stopAudio();
  const item = data[currentIndex];
  img.src = item.image;
  title.innerText = item.title;
  desc.innerText = item.text;
}

playButton.onclick = () => {
  stopAudio();
  currentAudio = new Audio(data[currentIndex].audio);
  currentAudio.play();
};

stopButton.onclick = stopAudio;

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  updateDisplay();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % data.length;
  updateDisplay();
};


fetch("topics.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    updateDisplay();
  });
