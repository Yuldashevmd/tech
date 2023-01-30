// carousel start
const buttons = document.querySelectorAll("[data-slide-direction]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.slideDirection === "next" ? 1 : -1;
    changeSlide(offset);
  });
});

const changeSlide = (offset) => {
  const slides = document.querySelector(".slides");
  const activeSlide = slides.querySelector("[data-active-slide]");
  let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  newIndex =
    newIndex < 0
      ? slides.children.length - 1
      : newIndex === slides.children.length
      ? 0
      : newIndex;
  slides.children[newIndex].dataset.activeSlide = true;
  delete activeSlide.dataset.activeSlide;

  const circles = document.querySelector(".slides-circles");
  const activeCircle = circles.querySelector("[data-active-slide]");
  circles.children[newIndex].dataset.activeSlide = true;
  delete activeCircle.dataset.activeSlide;
};

setInterval(changeSlide.bind(null, 1), 6000);
// carousel end

// form start
const userName = document.querySelector("#name");
const userPhone = document.querySelector("#phone");
const userComment = document.querySelector("#comment");
const formSubmit = document.querySelector("#submit");
const message = document.querySelector("#message");

let newUser = {};

// get-values-from-inputs
formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  formSubmit.setAttribute("disabled", true);

  newUser = {
    name: userName.value,
    phone: userPhone.value,
    comment: userComment.value ?? "",
  };
  fetch("lako/calluser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((res) => console.log(res, "res"))
    .catch((err) => console.log(err, "err"));
  message.style.color = "green";
  message.textContent = "Запрос отправлено...";

  setTimeout(() => {
    userName.value = "";
    userPhone.value = "";
    userComment.value = "";
    message.textContent = "";
  }, 1500);
  setTimeout(() => {
    formSubmit.disabled = false;
  }, 2500);
  console.log(newUser);
});
// form end
