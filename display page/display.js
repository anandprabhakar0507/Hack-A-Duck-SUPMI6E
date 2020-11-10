import Blog from "./blog.js";

var blogs_a = []; //array of blogs(class)
var blogs_box = document.querySelector("#my_blogs");

async function get_blogs() {
  const res = await fetch("http://localhost:3000/api/blogs");
  const respJson = await res.json();

  respJson.data.blogs.forEach((element) => {
    blogs_a.push(
      new Blog(
        element._id,
        element.title,
        element.body,
        element.likes,
        element.dislikes,
        element.image,
        element.createdAt
      )
    );
  });
}

async function renderblogs() {
  await get_blogs();
  blogs_box.innerHTML = "";
  blogs_a.forEach((element) => {
    blogs_box.appendChild(element.getelement());
  });
}
 window.onload = async () => {
  await renderblogs();
  const addBlog = document.getElementById("blog-add");
  const adminOptions = document.querySelectorAll(".admin-options");
  const isLoggedIn = localStorage.getItem("loggedIn");
  console.log(isLoggedIn);
  const logoutBtn = document.querySelector(".logout-btn");
  const loginBtn = document.querySelector(".dropleft");
  if (isLoggedIn === "true") {
    addBlog.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    adminOptions.forEach((group) => {
      group.classList.remove("hidden");
    });
    logoutBtn.classList.remove("hidden");
  } else {
    addBlog.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    console.log(adminOptions);
    adminOptions.forEach((group) => {
      group.classList.add("hidden");
    });
  }
};