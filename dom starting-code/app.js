const section = document.querySelector("section");
section.style.backgroundColor = "blue";

const button = document.querySelector("button");

button.addEventListener("click", () => {
//   if (section.className === "red-bg visible") {
//     section.className = "red-bg invisible";
//   } else {
//     section.className = "red-bg visible";
//   }
  section.classList.toggle('visible');
  section.classList.toggle('invisible');
});

