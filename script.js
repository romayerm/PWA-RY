document.addEventListener("DOMContentLoaded", () => {
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

const welcomeSection = document.getElementById("welcome");
const learnSection = document.getElementById("learn");
const quizSection = document.getElementById("quiz");

const navWelcome = document.getElementById("navWelcome");
const navLearn = document.getElementById("navLearn");
const navQuiz = document.getElementById("navQuiz");

const quizAudio = new Audio();
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");

const successSound = new Audio("assets/audio/success.mp3");
const failSound = new Audio("assets/audio/fail.mp3");

fetch("topics.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    updateDisplay();
    showPage("welcome");
  });

const mascotGif = document.getElementById("mascot");
let mouseTimer;
document.addEventListener("mousemove", () => {
  mascotGif.src = "assets/pictures/mascot_still.png"; 
  clearTimeout(mouseTimer);
  mouseTimer = setTimeout(() => {
    mascotGif.src = "assets/pictures/mascot.gif"; 
  }, 300);
});

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
  const correctItem = data[correctIndex];

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
        quizResult.innerHTML = `<div class="confetti-overlay">
        <img src="assets/pictures/confetti.gif" alt="Confetti" class="confetti-gif">
        </div>
        `;
        setTimeout(() => {
        quizResult.innerHTML = "";
        }, 3000);
      } else {
        failSound.play();
        quizResult.innerHTML = `<div class="tomato-overlay">
        <img src="assets/pictures/tomato.gif" alt="Rotten Tomato" class="tomato-gif">
        </div>
        `;
        setTimeout(() => {
        quizResult.innerHTML = "";
        }, 3000);
      }
    };
    quizOptions.appendChild(btn);
  });
}

navWelcome.onclick = () => showPage("welcome");
navLearn.onclick = () => {
  showPage("learn");
  updateDisplay(); 
};
navQuiz.onclick = () => showPage("quiz");

});
