let elFrom = document.querySelector(".login__form");
let elInputEmail = document.querySelector(".login__email_label");
let elInputPassword = document.querySelector(".login__email_label");
let elErorText = document.querySelector(".error__text");
elFrom.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const data = {
    email: evt.target[0].value,
    password: evt.target[1].value,
  };
  const elEmail = "samandar@gmail.com";
  const elPassword = "11111111";

  if (data.email == elEmail && data.password == elPassword) {
    window.localStorage.setItem("user", JSON.stringify(data));
    setTimeout(() => {
      window.location = "/index.html";
    }, 1000);
  } else {
    elErorText.classList.add("error__text-open");
  }
});
