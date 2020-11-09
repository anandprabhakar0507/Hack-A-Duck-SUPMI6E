import Blog from "./blog.js";

var blogs_a = []; //array of blogs(class)
var blogs_box = document.querySelector("#my_blogs");

renderblogs();
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
        element.dislikes
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

