document.querySelector(".login-form").onsubmit = async function (e) {
  e.preventDefault();
  try {
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      throw new Error("Kindly enter email and password");
    }
    console.log(email, password);
    const resp = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      mode: "cors",
    });
    const respJSON = await resp.json();
    if(respJSON.status==="success" && respJSON.token){
      window.location.href = "../display page/display_html.html"
    }
    console.log(respJSON);
  } catch (error) {
    console.log(error.message);
  }
};
