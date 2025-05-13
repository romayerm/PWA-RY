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

const mascotGif = document.getElementById("mascot");
let mouseTimer;
document.addEventListener("mousemove", () => {
  mascotGif.src = "assets/mascot_still.png"; // Freeze when moving
  clearTimeout(mouseTimer);
  mouseTimer = setTimeout(() => {
    mascotGif.src = "assets/mascot.gif"; // Resume playing when still
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
  // Stop audio if navigating
  stopAudio();
  quizAudio.pause();
  quizAudio.currentTime = 0;
  quizResult.innerHTML = "";

  // Hide all
  welcomeSection.style.display = "none";
  learnSection.style.display = "none";
  quizSection.style.display = "none";
  document.getElementById(pageId).style.display = "block";

  // If quiz page, load new question
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

function loadQuiz() {
  const correctIndex = Math.floor(Math.random() * data.length);
  const correctItem = data[correctIndex];

  quizAudio.src = correctItem.audio;
  quizAudio.play();

  // Pick 2 other random, non-duplicate answers
  let options = [correctItem.title];
  while (options.length < 3) {
    let random = data[Math.floor(Math.random() * data.length)].title;
    if (!options.includes(random)) {
      options.push(random);
    }
  }

  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);

  // Render buttons
  quizOptions.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === correctItem.title) {
        successSound.play();
        quizResult.innerHTML = `<img src="assets/confetti.gif" alt="Confetti" style="width:100px;">`;
      } else {
        failSound.play();
        quizResult.innerHTML = `<span style="font-size: 3rem;">😢</span>`;
      }
    };
    quizOptions.appendChild(btn);
  });
}

// Navigation buttons
navWelcome.onclick = () => showPage("welcome");
navLearn.onclick = () => {
  showPage("learn");
  updateDisplay(); // Refresh Learn content
};
navQuiz.onclick = () => showPage("quiz");

showPage("welcome");

fetch("topics.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    updateDisplay();
  });
