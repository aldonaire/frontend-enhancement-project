// Show alert
function showAlert() {
  alert("Button clicked! 🚀");
}

// Reusable loader function
function loadComponent(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
      }
      return response.text();
    })
    .then(data => {
      const el = document.getElementById(elementId);
      if (el) {
        el.innerHTML = data;
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Detect correct path (important for pages folder)
const isSubPage = window.location.pathname.includes("/pages/");
const basePath = isSubPage ? "../components/" : "components/";

// Load components
loadComponent("navbar", basePath + "navbar.html");
loadComponent("footer", basePath + "footer.html");

// Handle contact form submit
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("contact-form")) {
    e.preventDefault();
    alert("Message sent! ✅");
    e.target.reset();
  }
});