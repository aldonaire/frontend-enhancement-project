// Dark mode toggle
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Modal elements
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

// Open modal
openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Extra button
document.getElementById("clickBtn").addEventListener("click", () => {
  alert("Button clicked!");
});
