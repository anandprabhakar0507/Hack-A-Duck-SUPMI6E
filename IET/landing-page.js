window.onload = () => {
  const isLoggeddIn = localStorage.getItem("loggedIn");
  console.log(isLoggeddIn);
  const logoutBtn = document.querySelector(".logout-btn");
  const loginBtn = document.querySelector(".dropleft");
  if (isLoggeddIn === "true") {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
};
