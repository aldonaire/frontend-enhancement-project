// MODAL
function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// FORM VALIDATION
function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let error = document.getElementById("error");

  if (!name || !email) {
    error.textContent = "All fields are required!";
    return false;
  }

  error.style.color = "lightgreen";
  error.textContent = "Form submitted successfully!";
  return false;
}

// MOBILE MENU
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}