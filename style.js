body {
  margin: 0;
  font-family: 'Segoe UI', 'Noto Sans JP', Arial, sans-serif;
  color: #e0e0ff;
  background: #181025;
  min-height: 100vh;
  overflow-x: hidden;
}
.bg-anim {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 60% 25%, #2d0b4d 0%, #181025 70%);
  animation: bgmove 12s linear infinite alternate;
  opacity: 0.86;
}
@keyframes bgmove {
  0% { background-position: 70% 20%, 30% 80%; }
  100% { background-position: 30% 80%, 70% 20%; }
}
.main-panel {
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 2.5rem auto 0 auto;
  background: rgba(24, 16, 37, 0.97);
  border-radius: 22px;
  box-shadow: 0 8px 40px #000a;
  padding: 2.5rem 2rem 1.2rem 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}
h1 {
  font-size: 2.5rem;
  letter-spacing: 0.03em;
  font-weight: 700;
  margin: 0 0 1.2rem 0;
  text-align: center;
  color: #c197fd;
  text-shadow: 0 2px 22px #7d27e2;
  opacity: 0.97;
  animation: fadeIn 1.2s;
}
h2 {
  margin: 0 0 1rem 0;
  color: #b483e6;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
}
.panel {
  background: rgba(18, 11, 28, 0.95);
  border-radius: 16px;
  box-shadow: 0 2px 16px #0005;
  padding: 1.5rem 1rem 1.3rem 1rem;
  margin-bottom: 0.7rem;
  animation: fadeIn 0.8s;
  transition: box-shadow 0.2s;
}
.fade-in {
  opacity: 0;
  animation: fadeIn 0.7s forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: none;}
}
.chart {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  margin-bottom: 1.6rem;
}
.row {
  display: flex;
  align-items: center;
  gap: 0.13rem;
  margin-bottom: 0.04rem;
}
.row-label {
  width: 1.5em;
  text-align: right;
  color: #645b8e;
  font-size: 1.1em;
  margin-right: 0.2em;
  font-weight: 500;
  opacity: 0.75;
}
.kana-btn {
  background: linear-gradient(150deg, #2a144a 70%, #431e6e 100%);
  border: none;
  border-radius: 10px;
  color: #f1e8ff;
  font-size: 1.25em;
  font-family: inherit;
  padding: 0.25em 0.45em 0.18em 0.45em;
  margin: 0 0.07em;
  min-width: 2.4em;
  cursor: pointer;
  box-shadow: 0 1px 8px #7d27e22a;
  transition: background 0.32s, box-shadow 0.18s, transform 0.13s;
  outline: none;
  position: relative;
}
.kana-btn.selected {
  background: linear-gradient(120deg, #7d27e2 60%, #a16cf2 100%);
  color: #fff;
  box-shadow: 0 2px 22px #7d27e2a0;
  transform: scale(1.08);
  z-index: 2;
}
.kana-btn:not(.selected):hover {
  background: linear-gradient(150deg, #4b276d 60%, #2a144a 100%);
  color: #d7c7f6;
  box-shadow: 0 2px 20px #a37ff13a;
  transform: scale(1.04);
}
.kana-btn.empty {
  background: transparent;
  box-shadow: none;
  pointer-events: none;
  min-width: 2.4em;
}
.kana-char {
  font-size: 1.15em;
  display: block;
  font-weight: 700;
}
.kana-romaji {
  font-size: 0.73em;
  color: #bda4e5;
  display: block;
  font-weight: 500;
  letter-spacing: 0.01em;
  opacity: 0.7;
}
.panel-controls {
  display: flex;
  gap: 0.6em;
  margin: 0.8em 0 0.1em 0;
}
button {
  background: linear-gradient(120deg, #322452 60%, #4b276d 100%);
  color: #e6d2fc;
  border: none;
  padding: 0.44em 1.1em;
  border-radius: 8px;
  font-size: 1.01em;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.16s, transform 0.09s;
  font-weight: 500;
  box-shadow: 0 1px 10px #362e4b2c;
  outline: none;
}
button:active {
  transform: scale(0.97);
  box-shadow: 0 0 0 #0000;
}
button.accent {
  background: linear-gradient(120deg, #7d27e2 60%, #a16cf2 100%);
  color: #fff;
  box-shadow: 0 2px 22px #7d27e2b0;
}
button.muted {
  background: linear-gradient(120deg, #2d203f 60%, #3a2d4e 100%);
  color: #bda4e5;
}
button:disabled {
  background: #2a144a;
  color: #6c4c98;
  opacity: 0.59;
  cursor: not-allowed;
}
.warn {
  margin-top: 0.7em;
  color: #ffb6c1;
  background: #2a144a50;
  border-radius: 8px;
  padding: 0.5em 1em;
  font-size: 1.05em;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 1px 10px #ffb6c11b;
}
#quiz-panel {
  text-align: center;
}
#quiz-q {
  margin: 1.5em 0 1.3em 0;
}
.quiz-char {
  font-size: 3.6em;
  font-weight: 700;
  margin-bottom: 0.6em;
  color: #fff;
  text-shadow: 0 2px 26px #b483e6;
  animation: fadeIn 0.7s;
  letter-spacing: 0.03em;
}
.quiz-choices {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2em;
  justify-content: center;
  margin-top: 1em;
}
.quiz-choice {
  background: linear-gradient(120deg, #4b276d 60%, #7d27e2 100%);
  color: #fff;
  font-size: 1.13em;
  font-weight: 600;
  padding: 0.5em 1.4em;
  border-radius: 10px;
  margin: 0.12em;
  cursor: pointer;
  transition: background 0.18s, transform 0.12s, box-shadow 0.14s;
  box-shadow: 0 2px 16px #7d27e237;
}
.quiz-choice.correct {
  background: linear-gradient(120deg, #2fd86f 60%, #2aef9c 100%);
  color: #23193a;
  font-weight: 700;
  box-shadow: 0 2px 22px #2aef9c70;
}
.quiz-choice.incorrect {
  background: linear-gradient(120deg, #e24d7d 60%, #d86fcf 100%);
  color: #fff;
  box-shadow: 0 2px 22px #e24d7d60;
}
.quiz-choice:active {
  transform: scale(0.95);
}
footer {
  margin: 2.5em auto 0 auto;
  color: #7a6a9c;
  text-align: center;
  font-size: 1.04em;
  letter-spacing: 0.05em;
}
footer a {
  color: #b483e6;
  text-decoration: none;
  font-weight: 500;
}
@media (max-width: 700px) {
  .main-panel { padding: 1.2rem 0.4rem; }
}
