// Focus Timer — простой Pomodoro-таймер на чистом JavaScript.
// Состояние держим в одном объекте, рендер — отдельной функцией.

const MODES = {
  focus: { minutes: 25, label: "Время сосредоточиться" },
  short: { minutes: 5, label: "Короткий перерыв" },
  long: { minutes: 15, label: "Длинный перерыв" },
};

// Длина окружности прогресс-кольца: 2 * PI * r (r = 110).
const RING_LENGTH = 2 * Math.PI * 110;

const els = {
  time: document.getElementById("time"),
  label: document.getElementById("label"),
  startPause: document.getElementById("startPause"),
  reset: document.getElementById("reset"),
  completed: document.getElementById("completed"),
  progress: document.querySelector(".timer__progress"),
  modeButtons: document.querySelectorAll(".modes__btn"),
};

const state = {
  mode: "focus",
  remaining: MODES.focus.minutes * 60,
  running: false,
  intervalId: null,
};

function totalSeconds() {
  return MODES[state.mode].minutes * 60;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function render() {
  els.time.textContent = formatTime(state.remaining);
  els.label.textContent = MODES[state.mode].label;
  els.startPause.textContent = state.running ? "Пауза" : "Старт";
  document.title = `${formatTime(state.remaining)} — Focus Timer`;

  const progress = state.remaining / totalSeconds();
  els.progress.style.strokeDasharray = RING_LENGTH;
  els.progress.style.strokeDashoffset = RING_LENGTH * (1 - progress);
}

function tick() {
  state.remaining -= 1;
  if (state.remaining <= 0) {
    finishSession();
    return;
  }
  render();
}

function start() {
  if (state.running) return;
  state.running = true;
  state.intervalId = setInterval(tick, 1000);
  render();
}

function pause() {
  state.running = false;
  clearInterval(state.intervalId);
  render();
}

function reset() {
  pause();
  state.remaining = totalSeconds();
  render();
}

function setMode(mode) {
  state.mode = mode;
  els.modeButtons.forEach((btn) =>
    btn.classList.toggle("is-active", btn.dataset.mode === mode)
  );
  reset();
}

function finishSession() {
  pause();
  state.remaining = 0;
  render();

  // Считаем только завершённые рабочие сессии.
  if (state.mode === "focus") {
    incrementCompleted();
  }
  notify();
  // Небольшая пауза, затем сбрасываем таймер к началу режима.
  setTimeout(() => reset(), 1500);
}

// --- Статистика за день (localStorage) ---

function todayKey() {
  return `focus-timer:${new Date().toISOString().slice(0, 10)}`;
}

function getCompleted() {
  return Number(localStorage.getItem(todayKey()) || 0);
}

function incrementCompleted() {
  const next = getCompleted() + 1;
  localStorage.setItem(todayKey(), String(next));
  els.completed.textContent = next;
}

function notify() {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Focus Timer", { body: "Сессия завершена!" });
  }
}

// --- События ---

els.startPause.addEventListener("click", () => {
  state.running ? pause() : start();
});

els.reset.addEventListener("click", reset);

els.modeButtons.forEach((btn) =>
  btn.addEventListener("click", () => setMode(btn.dataset.mode))
);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    state.running ? pause() : start();
  }
});

// Запрос разрешения на уведомления — без блокировки интерфейса.
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

els.completed.textContent = getCompleted();
render();
