/* eslint-disable */
document.querySelector('.login-form').onsubmit = async function (e) {
  e.preventDefault();
  try {
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      throw new Error('Kindly enter email and password');
    }
    console.log(email, password);
    const resp = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      mode: 'cors',
    });
    const respJSON = await resp.json();
    if (respJSON.status === 'success' && respJSON.token) {
      localStorage.setItem('loggedIn', true);
      alert('Successfully Logged in');
      const directoryArray = window.location.href.split('/');
      const lastDirectory = directoryArray[directoryArray.length - 2];
      if (
        lastDirectory.startsWith('display')
      ) {
        window.location.href = './display_html.html';
      } else {
        window.location.href = './display page/display_html.html';
      }
    } else {
      throw new Error(respJSON.message + " ytaha");
    }
    console.log(respJSON);
  } catch (error) {
    alert(error.message);
  }
};

document.querySelector('.logout-btn').onclick = async () => {
  const res = await fetch('/api/users/logout', {
    method: 'POST',
    credentials: 'include',
  });
  const resJSON = await res.json();
  if (resJSON.status === 'success') {
    localStorage.setItem('loggedIn', false);
    alert('Successfully Logged out');
    const directoryArray = window.location.href.split('/');
    const lastDirectory = directoryArray[directoryArray.length - 2];
    if (
      lastDirectory.startsWith('display') ||
      lastDirectory.startsWith('edit') ||
      lastDirectory.startsWith('compose')
    ) {
      window.location.href = '../index.html';
    } else {
      window.location.href = './index.html';
    }
  }
};
