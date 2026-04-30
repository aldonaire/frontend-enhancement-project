// ================= OLD FUNCTION =================
function showAlert() {
  alert("Button clicked!");
}

// ================= LOAD COMPONENTS (OLD) =================
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
});

function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// ================= NEW: DARK MODE =================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ================= NEW: MODAL =================
function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
