const toastData = "Hello from toast";
const showToastButton = document.getElementById("showToast");
const toastContainer = document.getElementById("toastContainer");
const duration = 3000;

let timeOutId;

showToastButton.addEventListener("click", () => {
  console.log("clicked");
  if (timeOutId) {
    clearTimeout(timeOutId);
    timeOutId = null;
  }
  const position = document.querySelector(
    'input[name="position"]:checked'
  ).value;
  toastContainer.setAttribute("position", position);
  toastContainer.style.display = "block";
  toastContainer.textContent = toastData;
  timeOutId = setTimeout(() => {
    toastContainer.style.display = "none";
  }, duration);
});
