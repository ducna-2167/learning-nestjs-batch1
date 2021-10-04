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
  data.username = username;
  data.password = password;
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

function createArticle() {
  let title = document.getElementsByName('title')[0].value;
  let content = document.getElementsByName('content')[0].value;

  data.title = title;
  data.content = content;
  console.log(data);
  fetch('http://localhost:3000/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    switch (res.status) {
      case 409:
        alert('user or email is already used');
        break;
      case 201:
        res.json().then((resdata) => {
          window.location.href = `http://localhost:3000/articles/${resdata.id}`;
        });
        break;
      default:
        alert('there is some error');
        break;
    }
  });
}
