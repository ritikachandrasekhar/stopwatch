let startTime,
  updatedTime,
  difference,
  tInterval,
  running = false,
  lapCounter = 0,
  milliseconds = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(getShowTime, 10); // Update every 10 milliseconds for smoother display
    running = true;
    toggleButtonState();
  }
});

document.getElementById("pause").addEventListener("click", () => {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    toggleButtonState();
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  milliseconds = 0; // Reset milliseconds
  display.innerHTML = "00:00:00.000"; // Reset display format
  laps.innerHTML = "";
  lapCounter = 0;
  toggleButtonState();
});

document.getElementById("lap").addEventListener("click", () => {
  if (running) {
    lapCounter++;
    const lapTime = display.innerHTML;
    const lapElement = document.createElement("li");
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapElement);
  }
});

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  // Calculate time components
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  milliseconds = Math.floor(difference % 1000);

  // Update the display with formatted time
  display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMS(
    milliseconds
  )}`;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

function padMS(number) {
  if (number < 10) {
    return "00" + number;
  } else if (number < 100) {
    return "0" + number;
  } else {
    return number;
  }
}

function toggleButtonState() {
  document.getElementById("start").disabled = running;
  document.getElementById("pause").disabled = !running;
}
