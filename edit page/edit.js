window.onload = () => {
  const title = localStorage.getItem("blog-title");
  const body = localStorage.getItem("blog-body");
  document.querySelector(".blog-title").value = title;
  document.querySelector(".blog-body").value = body;
};

document.querySelector(".edit-form").onsubmit = async (e) => {
  const id = localStorage.getItem("blog-id");
  e.preventDefault();
  try {
    const newTitle = e.target.title.value;
    const newBody = e.target.body.value;
    const newFile = e.target.file.files[0];
    if (!newTitle || !newBody) {
      throw new Error("Blog must have a title and a body");
    }
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("body", newBody);
    formData.append("image", newFile);
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: "PATCH",
      body: formData,
    });
    const resJson = await res.json();
    if (resJson.status === "success") {
      localStorage.setItem("blog-title", "");
      localStorage.setItem("blog-body", "");
      localStorage.setItem("blog-id", "");
      window.location.href = "/display page/display_html.html";
    }
    console.log(resJson);
  } catch (error) {
    console.log(error.message);
  }
};
