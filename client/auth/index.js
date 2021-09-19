//  <input type="text" name="name" placeholder="Name" />
//  <input type="text" name="username" placeholder="Username" />
//  <input type="text" name="email" placeholder="E-mail" />
//  <input type="password" name="password" placeholder="Password" />
//  <input type="password" name="password2" placeholder="Retype password" />
//  <input type="password" name="avatar" placeholder="Avatar" />

const e = require('express');

const data = {};

function uploadPicture() {
  const fileInput = document.getElementById('image-upload').files[0];
  const FD = new FormData();
  FD.append('file', fileInput);
  fetch('http://localhost:3000/photo-upload', {
    method: 'POST',
    body: FD,
  })
    .then((response) => response.json())
    .then((resData) => {
      data.avatar = resData.path;
    });
}

function registerUser() {
  data.name = document.getElementsByName('name')[0].value;
  data.username = document.getElementsByName('username')[0].value;
  data.email = document.getElementsByName('email')[0].value;
  data.password = document.getElementsByName('password')[0].value;
  console.log(data);
  if (
    document.getElementsByName('password')[0].value !=
    document.getElementsByName('password2')[0].value
  ) {
    alert('Password do not match.');
    return false;
  }
  fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
    switch (response.status) {
      case 409:
        alert('user or email is already used');
        break;
      case 201:
        window.location.href = 'http://localhost:3000/auth/signin';
        break;
      default:
        alert('there is some error');
        break;
    }
  });
}

function loginUser() {
  let username = document.getElementsByName('username')[0].value;
  let password = document.getElementsByName('password')[0].value;
  let data = {
    username: username,
    password: password,
  };
  console.log(data);

  fetch('http://localhost:3000/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.accessToken) alert('Wrong Username or Password');
      else window.location.href = 'http://localhost:3000/';
    });
}
