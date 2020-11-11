/* eslint-disable */
import Blog from './blog.js';

var blogs_a = []; //array of blogs(class)
var blogs_box = document.querySelector('#my_blogs');
var searchbox = document.querySelector('.searchblog');

async function get_blogs() {
  try {
    const res = await fetch('/api/blogs');
    const respJson = await res.json();
    console.log(respJson);
    if (respJson.status === 'error') {
      throw new Error(respJSON.message);
    }
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
    function compare(a, b) {
      if (a.date.getTime() > b.date.getTime()) {
        return -1;
      }
      if (a.date.getTime() < b.date.getTime()) {
        return 1;
      }
      return 0;
    }

    blogs_a.sort(compare);
  } catch (error) {
    alert(error.message);
  }
}

async function renderblogs() {
  await get_blogs();
  blogs_box.innerHTML = '';
  blogs_a.forEach((element) => {
    blogs_box.appendChild(element.getelement());
  });
}
window.onload = async () => {
  await renderblogs();
  const addBlog = document.getElementById('blog-add');
  const adminOptions = document.querySelectorAll('.admin-options');
  const isLoggedIn = localStorage.getItem('loggedIn');
  console.log(isLoggedIn);
  const logoutBtn = document.querySelector('.logout-btn');
  const loginBtn = document.querySelector('.dropleft');
  if (isLoggedIn === 'true') {
    addBlog.classList.remove('hidden');
    loginBtn.classList.add('hidden');
    adminOptions.forEach((group) => {
      group.classList.remove('hidden');
    });
    logoutBtn.classList.remove('hidden');
  } else {
    addBlog.classList.add('hidden');
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    console.log(adminOptions);
    adminOptions.forEach((group) => {
      group.classList.add('hidden');
    });
  }
};

searchbox.oninput = () => {
  console.log(searchbox.value);
  var blog_display = document.querySelector('#my_blogs');

  blog_display.innerHTML = '';
  console.log(blogs_a);
  var c = 0;
  for (var i = 0; i < blogs_a.length; i++) {
    if (
      blogs_a[i].title.toUpperCase().indexOf(searchbox.value.toUpperCase()) >
        -1 ||
      blogs_a[i].body.toUpperCase().indexOf(searchbox.value.toUpperCase()) > -1
    ) {
      c++;

      var blogel = blogs_a[i].getelement();
      console.log(blogel);
      blog_display.appendChild(blogel);
    }
  }
  if (c === 0) {
    blog_display.innerHTML = '<h2>...No Blogs found...</h2>';
  }
};
