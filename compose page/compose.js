document.querySelector(".compose-form").onsubmit = async function (e) {
  e.preventDefault();
  try {
    const title = e.target.title.value;
    const body = e.target.body.value;
    const file = e.target.file.files[0];
    if (!title || !body) {
      throw new Error("Blog must have a title and a body");
    }
    const formData = new FormData();
    formData.append("title",title);
    formData.append("body",body);
    formData.append("image",file)
    const res = await fetch("http://localhost:3000/api/blogs/", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const resJSON = await res.json();
    console.log(resJSON);
    console.log(title, body, file);
  } catch (error) {
      console.log(error.message);
  }
};
