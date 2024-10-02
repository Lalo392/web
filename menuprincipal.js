let visible = false;
function iniciar() {
  const elemento = document.getElementById("menu-img");
  elemento.addEventListener("click", mostrarMenu);
}
function mostrarMenu() {
  const elemento = document.getElementById("menuprincipal");
  if (!visible) {
    elemento.style.display = "flex";
    visible = true;
  } else {
    elemento.style.display = "none";
    visible = false;
  }
}
document.addEventListener("DOMContentLoaded", iniciar);