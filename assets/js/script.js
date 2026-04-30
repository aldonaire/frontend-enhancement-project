// Alert
function showAlert() {
  alert("Button clicked!");
}

// Load components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
});

// Fetch HTML components
function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

/* ===== Modal ===== */
function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* ===== Dark Mode ===== */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
