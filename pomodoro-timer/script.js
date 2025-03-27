
document.addEventListener("DOMContentLoaded", function () {
  let timeLeft = 5 * 60; // 初期時間（秒）
  let timer = null; // タイマーの変数
  let isRunning = false; // タイマーの状態

  const timeDisplay = document.getElementById("time-display");
  const startBtn = document.getElementById("start-btn");
  const decreaseTimeBtn = document.getElementById("decrease-time");
  const increaseTimeBtn = document.getElementById("increase-time");
  const timeSlider = document.getElementById("time-slider");

  // 時間を表示する関数
  function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  // スライダーの変更時
  timeSlider.addEventListener("input", function () {
    if (!isRunning) {
      timeLeft = parseInt(timeSlider.value) * 60;
      updateDisplay();
    }
  });

  // `－` ボタン
  decreaseTimeBtn.addEventListener("click", function () {
    if (!isRunning && timeLeft > 60) {
      timeLeft -= 60;
      timeSlider.value = timeLeft / 60;
      updateDisplay();
    }
  });

  // `＋` ボタン
  increaseTimeBtn.addEventListener("click", function () {
    if (!isRunning && timeLeft < 60 * 60) {
      timeLeft += 60;
      timeSlider.value = timeLeft / 60;
      updateDisplay();
    }
  });

  // タイマー開始・停止
  startBtn.addEventListener("click", function () {
    if (isRunning) {
      clearInterval(timer);
      startBtn.textContent = "▶ 開始";
    } else {
      timer = setInterval(function () {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          clearInterval(timer);
          isRunning = false;
          startBtn.textContent = "▶ 開始";
          alert("時間が終了しました！ ⏳");
        }
      }, 1000);
      startBtn.textContent = "■ 停止";
    }
    isRunning = !isRunning;
  });

  // 初回表示の更新
  updateDisplay();
});