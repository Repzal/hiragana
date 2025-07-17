// Hiragana Chart Data
const chart = [
  ["",   ["あ","a"], ["い","i"], ["う","u"], ["え","e"], ["お","o"]],
  ["K",  ["か","ka"], ["き","ki"], ["く","ku"], ["け","ke"], ["こ","ko"]],
  ["S",  ["さ","sa"], ["し","shi"], ["す","su"], ["せ","se"], ["そ","so"]],
  ["T",  ["た","ta"], ["ち","chi"], ["つ","tsu"], ["て","te"], ["と","to"]],
  ["N",  ["な","na"], ["に","ni"], ["ぬ","nu"], ["ね","ne"], ["の","no"]],
  ["H",  ["は","ha"], ["ひ","hi"], ["ふ","fu"], ["へ","he"], ["ほ","ho"]],
  ["M",  ["ま","ma"], ["み","mi"], ["む","mu"], ["め","me"], ["も","mo"]],
  ["Y",  ["や","ya"], null, ["ゆ","yu"], null, ["よ","yo"]],
  ["R",  ["ら","ra"], ["り","ri"], ["る","ru"], ["れ","re"], ["ろ","ro"]],
  ["W",  ["わ","wa"], null, null, null, ["を","wo"]],
  ["N",  ["ん","n"]]
];

function flattenChart() {
  return chart.flatMap(row =>
    row.slice(1).filter(Boolean).map(([kana, romaji]) => ({kana, romaji}))
  );
}
const flat = flattenChart();

// --- Session/Stat State ---
let sessionCount = 0;
let totalCorrect = 0;
let totalIncorrect = 0;
let kanaStats = {};
flat.forEach(h => { kanaStats[h.kana] = { correct: 0, incorrect: 0 }; });

// --- App State ---
let selected = flat.map(h => h.kana);
let quizMode = false;
let quizScore = { correct: 0, total: 0 };
let quizQ = null;
let quizChoices = [];

// --- UI Elements ---
const chartDiv = document.getElementById("chart");
const quizPanel = document.getElementById("quiz-panel");
const chartPanel = document.getElementById("chart-panel");
const warnDiv = document.getElementById("warn");
const scoreSpan = document.getElementById("score");
const quizQDiv = document.getElementById("quiz-q");
const sessionsCountSpan = document.getElementById("sessions-count");
const totalCorrectSpan = document.getElementById("total-correct");
const totalIncorrectSpan = document.getElementById("total-incorrect");

// --- Helper Functions ---
function shuffle(arr) {
  return arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0]-b[0])
    .map(a => a[1]);
}
function getKanaLevel(kana) {
  const stat = kanaStats[kana];
  const attempts = stat.correct + stat.incorrect;
  if (attempts < 3) return "gray";
  let pct = attempts ? (stat.correct / attempts) : 0;
  if (pct >= 0.8) return "green";
  if (pct >= 0.5) return "amber";
  return "red";
}
function updateStatsPanel() {
  sessionsCountSpan.textContent = sessionCount;
  totalCorrectSpan.textContent = totalCorrect;
  totalIncorrectSpan.textContent = totalIncorrect;
}

function renderChart() {
  chartDiv.innerHTML = "";
  chart.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    if (row[0]) {
      const lbl = document.createElement("span");
      lbl.className = "row-label";
      lbl.textContent = row[0];
      rowDiv.appendChild(lbl);
    } else {
      rowDiv.appendChild(document.createElement("span")).className = "row-label";
    }
    for (let i=1; i<6; ++i) {
      if (row[i]) {
        const [kana, romaji] = row[i];
        const btn = document.createElement("button");
        btn.className = "kana-btn fade-in";
        btn.innerHTML = `
          <span class="kana-char">${kana}</span>
          <span class="kana-romaji">${romaji}</span>
          <span class="kana-indicator ${getKanaLevel(kana)}"></span>
        `;
        if (selected.includes(kana)) btn.classList.add("selected");
        btn.onclick = () => {
          if (selected.includes(kana)) {
            selected = selected.filter(k => k !== kana);
          } else {
            selected.push(kana);
          }
          renderChart();
          updateWarn();
          updateQuizBtn();
        };
        rowDiv.appendChild(btn);
      } else {
        rowDiv.appendChild(document.createElement("span")).className = "kana-btn empty";
      }
    }
    chartDiv.appendChild(rowDiv);
  });
}

function selectAll() {
  selected = flat.map(h => h.kana);
  renderChart();
  updateWarn();
  updateQuizBtn();
}
function deselectAll() {
  selected = [];
  renderChart();
  updateWarn();
  updateQuizBtn();
}
function updateWarn() {
  warnDiv.style.display = selected.length < 4 ? "" : "none";
}
function updateQuizBtn() {
  document.getElementById("start-quiz").disabled = selected.length < 4;
}

function startQuiz() {
  quizScore = { correct: 0, total: 0 };
  quizMode = true;
  sessionCount++;
  updateStatsPanel();
  chartPanel.style.display = "none";
  quizPanel.style.display = "";
  nextQuizQ();
}
function stopQuiz() {
  quizMode = false;
  quizPanel.style.display = "none";
  chartPanel.style.display = "";
  renderChart();
}
function nextQuizQ() {
  const pool = flat.filter(h => selected.includes(h.kana));
  if (pool.length < 4) {
    quizQDiv.innerHTML = "<div class='warn'>Not enough kana selected!</div>";
    return;
  }
  const answer = pool[Math.floor(Math.random() * pool.length)];
  const distractors = shuffle(flat.filter(h => h.kana !== answer.kana)).slice(0,3);
  quizChoices = shuffle([answer, ...distractors]);

  scoreSpan.textContent = `${quizScore.correct}/${quizScore.total}`;
  quizQDiv.innerHTML = `
    <div class="quiz-char">${answer.kana}</div>
    <div class="quiz-choices">
      ${quizChoices.map((h,i) => `
        <button class="quiz-choice" data-i="${i}">${h.romaji}</button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".quiz-choice").forEach((btn, i) => {
    btn.onclick = () => handleQuizChoice(quizChoices[i], btn, answer);
  });
}
function handleQuizChoice(choice, btn, answer) {
  document.querySelectorAll(".quiz-choice").forEach(b => b.disabled = true);
  if (choice.kana === answer.kana) {
    btn.classList.add("correct");
    quizScore.correct++;
    totalCorrect++;
    kanaStats[answer.kana].correct++;
  } else {
    btn.classList.add("incorrect");
    totalIncorrect++;
    kanaStats[answer.kana].incorrect++;
    // highlight correct
    let idx = quizChoices.findIndex(h => h.kana === answer.kana);
    document.querySelectorAll(".quiz-choice")[idx].classList.add("correct");
  }
  quizScore.total++;
  updateStatsPanel();
  renderChart();
  scoreSpan.textContent = `${quizScore.correct}/${quizScore.total}`;
  setTimeout(nextQuizQ, 800);
}

// --- Init ---
renderChart();
updateWarn();
updateQuizBtn();
updateStatsPanel();

document.getElementById("select-all").onclick = selectAll;
document.getElementById("deselect-all").onclick = deselectAll;
document.getElementById("start-quiz").onclick = startQuiz;
document.getElementById("exit-quiz").onclick = stopQuiz;
