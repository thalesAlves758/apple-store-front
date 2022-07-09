let lastIntervalId;

function clearLastInterval() {
  if (lastIntervalId) {
    clearInterval(lastIntervalId);
  }
}

function setNewInterval(callback, interval) {
  clearLastInterval();

  lastIntervalId = setInterval(callback, interval);
}

export { clearLastInterval, setNewInterval };
