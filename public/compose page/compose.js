/* eslint-disable */
document.querySelector('.compose-form').onsubmit = async function (e) {
  e.preventDefault();
  try {
    const title = e.target.title.value;
    const body = e.target.body.value;
    const file = e.target.file.files[0];
    const date = new Date().toISOString();
    
    if (!title || !body) {
      throw new Error('Blog must have a title and a body');
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('image', file);
    formData.append('createdAt', date);
    
    const res = await fetch('/api/blogs/', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const resJSON = await res.json();
    console.log(resJSON);
    if (resJSON.status == 'success') {
      alert('Your Post has been published!!');
      window.location.href = '../display page/display_html.html';
    } else {
      throw new Error(resJson.message);
    }
    console.log(resJSON);
    console.log(title, body, file);
  } catch (error) {
    alert(error);
  }
};

window.onload = () => {
  const isLoggeddIn = localStorage.getItem('loggedIn');
  console.log(isLoggeddIn);
  const logoutBtn = document.querySelector('.logout-btn');
  const loginBtn = document.querySelector('.dropleft');
  if (isLoggeddIn === 'true') {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
  }
};
