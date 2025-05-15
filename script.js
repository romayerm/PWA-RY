document.addEventListener("DOMContentLoaded", () => {
let data = [];
let currentIndex = 0;
let currentAudio = null;

const canvas = document.getElementById("soundImage");
const ctx = canvas.getContext("2d");
const title = document.getElementById("soundTitle");
const desc = document.getElementById("description");
const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const navWelcome = document.getElementById("navWelcome");
const navLearn = document.getElementById("navLearn");
const navQuiz = document.getElementById("navQuiz");

const quizPlayBtn = document.getElementById("quizPlayBtn");
const nextQuizBtn = document.getElementById("nextQuizBtn");
const quizAudio = new Audio();
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");

const successSound = new Audio("assets/audio/correct.mp3");
successSound.volume = 0.5;
const failSound = new Audio("assets/audio/incorrect.mp3");

fetch("topics.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    updateDisplay();
    showPage("welcome");
  }); //good

const mascotGif = document.getElementById("mascot");
let mouseTimer;
document.addEventListener("mousemove", () => {
  mascotGif.src = "assets/pictures/mascot_still.png"; 
  clearTimeout(mouseTimer);
  mouseTimer = setTimeout(() => {
    mascotGif.src = "assets/pictures/mascot.gif"; 
  }, 300);
}); //good

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
  title.innerText = item.title;
  desc.innerText = item.text;

  const image = new Image();
  image.src = item.image;

  image.onload = () => {
  canvas.width = 350;
  canvas.height = 350;

  const imgRatio = image.width / image.height;
  const canvasRatio = canvas.width / canvas.height;

  let sx, sy, sWidth, sHeight;

  if (imgRatio > canvasRatio) {
    sHeight = image.height;
    sWidth = sHeight * canvasRatio;
    sx = (image.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = image.width;
    sHeight = sWidth / canvasRatio;
    sx = 0;
    sy = (image.height - sHeight) / 2;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
};

}

function showPage(pageId) {
  stopAudio();
  quizAudio.pause();
  quizAudio.currentTime = 0;
  quizResult.innerHTML = "";

document.querySelectorAll(".page").forEach(section => {
  section.classList.remove("active");
});
document.getElementById(pageId).classList.add("active");

  if (pageId === "quiz") {
    loadQuiz();
  }
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

let correctItem = null;
function loadQuiz() {
  const correctIndex = Math.floor(Math.random() * data.length);
  correctItem = data[correctIndex];

  quizAudio.src = correctItem.audio;

  let options = [correctItem.title];
  while (options.length < 3) {
    let random = data[Math.floor(Math.random() * data.length)].title;
    if (!options.includes(random)) {
      options.push(random);
    }
  }

  options = options.sort(() => Math.random() - 0.5);

  quizOptions.innerHTML = "";
  quizResult.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === correctItem.title) {
        successSound.play();
        setTimeout(() => {
        successSound.pause();
        successSound.currentTime = 0;
        }, 4000);
        quizResult.innerHTML = `<div class="confetti-overlay">
        <img src="assets/pictures/confetti.gif" alt="Confetti" class="confetti-gif">
        </div>
        `;
        setTimeout(() => {
        quizResult.innerHTML = "";
        }, 4000);
      } else {
        failSound.play();
        setTimeout(() => {
        failSound.pause();
        failSound.currentTime = 0;
        }, 4000);
        quizResult.innerHTML = `<div class="tomato-overlay">
        <img src="assets/pictures/tomato.gif" alt="Rotten Tomato" class="tomato-gif">
        </div>
        `;
        setTimeout(() => {
        quizResult.innerHTML = "";
        }, 4000);
      }
    };
    quizOptions.appendChild(btn);
  });
}

quizPlayBtn.onclick = () => {
  if (correctItem && correctItem.audio) {
    quizAudio.src = correctItem.audio;
    quizAudio.play();
  }
};

const quizStopBtn = document.getElementById("quizStopBtn");

quizStopBtn.onclick = () => {
  quizAudio.pause();
  quizAudio.currentTime = 0;
};

quizStopBtn.onclick = () => {
  quizAudio.pause();
  quizAudio.currentTime = 0;
};

nextQuizBtn.onclick = () => {
  loadQuiz();
};

navWelcome.onclick = () => showPage("welcome");
navLearn.onclick = () => {
  showPage("learn");
  updateDisplay(); 
};
navQuiz.onclick = () => showPage("quiz");

document.addEventListener("click", (event) => {
  if (!event.target.closest("#quizOptions")) {
    successSound.pause();
    successSound.currentTime = 0;
    failSound.pause();
    failSound.currentTime = 0;
    quizResult.innerHTML = "";
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

});
