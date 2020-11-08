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
    console.log(respJSON);
    const blogs = await fetch("http://localhost:3000/api/blogs", {
      credentials: "include",
    });
    const blogsJSON = await blogs.json();
    console.log(blogsJSON);
  } catch (error) {
    console.log(error.message);
  }
};
