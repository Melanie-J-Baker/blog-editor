import {
  submitCommentForm,
  showPost,
  createPosts,
  deletePost,
  signup,
  login,
} from "./index";

let contentDiv = document.getElementById("content");

function addBtnEventListeners() {
  let signupBtn = document.getElementById("signupBtn");
  signupBtn.addEventListener("click", () => {
    signupForm();
  });
  let loginBtn = document.getElementById("loginBtn");
  loginBtn.addEventListener("click", () => {
    loginForm();
  });
}

function userStatusDisplay() {
  let userStatusDiv = document.getElementById("userStatus");
  let user = localStorage.getItem("user");
  if (user) {
    userStatusDiv.textContent = "Logged in as " + user;
  }
}

function signupForm() {
  contentDiv.textContent = "";
  let signupForm = document.createElement("form");
  let usernameDiv = document.createElement("div");
  let usernameLabel = document.createElement("label");
  let usernameInput = document.createElement("input");
  let passwordDiv = document.createElement("div");
  let passwordLabel = document.createElement("label");
  let passwordInput = document.createElement("input");
  let submitBtn = document.createElement("button");
  signupForm.id = "signupForm";
  signupForm.method = "POST";
  signupForm.action = "http://localhost:3000/blog/signup/";
  signupForm.onsubmit = (e) => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    signup(e, username, password);
    contentDiv.textContent = "User created: " + username;
    setTimeout(() => {
      createPosts();
    }, 3000);
  };
  usernameLabel.htmlFor = "username";
  usernameLabel.textContent = "Username: ";
  usernameLabel.className = "signupLabel";
  usernameInput.id = "username";
  usernameInput.type = "text";
  usernameInput.name = "username";
  passwordLabel.htmlFor = "password";
  passwordLabel.textContent = "Password: ";
  passwordLabel.className = "signupLabel";
  passwordInput.id = "password";
  passwordInput.type = "text";
  passwordInput.name = "password";
  submitBtn.type = "submit";
  submitBtn.class = "submitBtn";
  submitBtn.textContent = "Create account";
  usernameDiv.appendChild(usernameLabel);
  usernameDiv.appendChild(usernameInput);
  signupForm.appendChild(usernameDiv);
  passwordDiv.appendChild(passwordLabel);
  passwordDiv.appendChild(passwordInput);
  signupForm.appendChild(passwordDiv);
  signupForm.appendChild(submitBtn);
  contentDiv.appendChild(signupForm);
}

function loginForm() {
  contentDiv.textContent = "";
  let loginForm = document.createElement("form");
  let usernameDiv = document.createElement("div");
  let usernameLabel = document.createElement("label");
  let usernameInput = document.createElement("input");
  let passwordDiv = document.createElement("div");
  let passwordLabel = document.createElement("label");
  let passwordInput = document.createElement("input");
  let submitBtn = document.createElement("button");
  loginForm.id = "loginForm";
  loginForm.method = "POST";
  loginForm.action = "http://localhost:3000/blog/login/";
  loginForm.onsubmit = (e) => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    login(e, username, password);
  };
  usernameLabel.htmlFor = "username";
  usernameLabel.textContent = "Username: ";
  usernameLabel.className = "loginLabel";
  usernameInput.id = "username";
  usernameInput.type = "text";
  usernameInput.name = "username";
  passwordLabel.htmlFor = "password";
  passwordLabel.textContent = "Password: ";
  passwordLabel.className = "loginLabel";
  passwordInput.id = "password";
  passwordInput.type = "text";
  passwordInput.name = "password";
  submitBtn.type = "submit";
  submitBtn.class = "submitBtn";
  submitBtn.textContent = "Log in";
  usernameDiv.appendChild(usernameLabel);
  usernameDiv.appendChild(usernameInput);
  loginForm.appendChild(usernameDiv);
  passwordDiv.appendChild(passwordLabel);
  passwordDiv.appendChild(passwordInput);
  loginForm.appendChild(passwordDiv);
  loginForm.appendChild(submitBtn);
  contentDiv.appendChild(loginForm);
}

function renderPosts(posts) {
  for (let i in posts) {
    let postDiv = document.createElement("div");
    let title = document.createElement("h3");
    let text = document.createElement("p");
    let timestamp = document.createElement("p");
    let publishedDiv = document.createElement("div");
    let publishedLabel = document.createElement("label");
    let publishedInput = document.createElement("input");
    let commentsBtn = document.createElement("div");
    let deleteBtn = document.createElement("div");
    let updateBtn = document.createElement("div");
    postDiv.className = "postDiv";
    title.className = "title";
    text.className = "text";
    timestamp.className = "timestamp";
    publishedDiv.className = "publishedDiv";
    publishedLabel.className = "publishedLabel";
    publishedLabel.htmlFor = `published${posts[i]._id}`;
    publishedLabel.textContent = "Published?";
    publishedInput.id = `published${posts[i]._id}`;
    publishedInput.className = "publishedInput";
    publishedInput.type = "checkbox";
    publishedInput.name = "published";
    if (posts[i].published === true) {
      publishedInput.checked = true;
    } else {
      publishedInput.checked = false;
    }
    publishedInput.addEventListener("click", () => {
      if (posts[i].published === true) {
        posts[i].published = false;
      } else {
        posts[i].published = true;
      }
    });
    commentsBtn.className = "commentsBtn";
    commentsBtn.id = `${posts[i]._id}`;
    title.textContent = posts[i].title;
    text.textContent = posts[i].text;
    timestamp.textContent = posts[i].timestamp;
    commentsBtn.textContent = "See all comments";
    commentsBtn.addEventListener("click", (event) => {
      showPost(event.target.id);
    });
    deleteBtn.textContent = "Delete post";
    deleteBtn.className = "deleteBtn";
    deleteBtn.id = `${posts[i]._id}`;
    deleteBtn.addEventListener("click", (e) => {
      deletePost(e.target.id);
    });
    updateBtn.textContent = "Update post";
    updateBtn.className = "updateBtn";
    postDiv.appendChild(title);
    postDiv.appendChild(text);
    postDiv.appendChild(timestamp);
    publishedDiv.appendChild(publishedLabel);
    publishedDiv.appendChild(publishedInput);
    postDiv.appendChild(publishedDiv);
    postDiv.appendChild(commentsBtn);
    postDiv.appendChild(deleteBtn);
    postDiv.appendChild(updateBtn);
    contentDiv.appendChild(postDiv);
  }
}

function renderPost(post, comments) {
  let postDiv = document.createElement("div");
  let backBtn = document.createElement("div");
  let title = document.createElement("h3");
  let text = document.createElement("p");
  let timestamp = document.createElement("p");
  let commentsHeading = document.createElement("h3");
  let addCommentBtn = document.createElement("div");
  backBtn.className = "backBtn";
  postDiv.className = "postDetailDiv";
  title.className = "postDetailtitle";
  text.className = "postDetailtext";
  timestamp.className = "postDetailtimestamp";
  commentsHeading.className = "commentsHeading";
  addCommentBtn.className = "addCommentBtn";
  addCommentBtn.id = post._id;
  backBtn.textContent = "Back to all posts";
  title.textContent = post.title;
  text.textContent = post.text;
  timestamp.textContent = post.timestamp;
  commentsHeading.textContent = "Comments";
  addCommentBtn.textContent = "Add a comment";
  backBtn.addEventListener("click", () => {
    createPosts();
  });
  addCommentBtn.addEventListener("click", (event) => {
    addCommentForm(event.target.id);
  });
  postDiv.appendChild(backBtn);
  postDiv.appendChild(title);
  postDiv.appendChild(text);
  postDiv.appendChild(timestamp);
  postDiv.appendChild(commentsHeading);
  postDiv.appendChild(addCommentBtn);
  let commentsDiv = document.createElement("div");
  for (let i in comments) {
    let commentDiv = document.createElement("div");
    commentDiv.className = "commentDiv";
    let commentText = document.createElement("p");
    let commentUsername = document.createElement("p");
    let commentTimestamp = document.createElement("p");
    commentText.className = "commentText";
    commentUsername.className = "commentUsername";
    commentTimestamp.className = "commentTimestamp";
    commentText.textContent = comments[i].text;
    commentUsername.textContent = comments[i].username;
    commentTimestamp.textContent = comments[i].timestamp;
    commentDiv.appendChild(commentText);
    commentDiv.appendChild(commentUsername);
    commentDiv.appendChild(commentTimestamp);
    postDiv.appendChild(commentDiv);
  }
  contentDiv.appendChild(postDiv);
  postDiv.appendChild(commentsDiv);
}

function addCommentForm(id) {
  contentDiv.textContent = "";
  let addCommentHeading = document.createElement("h4");
  let backBtn = document.createElement("div");
  let form = document.createElement("form");
  let textInputDiv = document.createElement("div");
  let textInputLabel = document.createElement("label");
  let textInput = document.createElement("input");
  let usernameInputDiv = document.createElement("div");
  let usernameInputLabel = document.createElement("label");
  let usernameInput = document.createElement("input");
  let submitBtn = document.createElement("button");
  addCommentHeading.className = "addCommentHeading";
  addCommentHeading.textContent = "Add a comment";
  backBtn.className = "backBtn";
  backBtn.textContent = "Back to post";
  form.id = "addCommentForm";
  form.method = "POST";
  form.action = "http://localhost:3000/blog/posts/" + id + "/comments";
  form.onsubmit = (event) => {
    let text = textInput.value;
    let username = usernameInput.value;
    submitCommentForm(event, id, text, username);
  };
  textInputDiv.className = "commentInputDiv";
  textInputLabel.className = "commentInputLabel";
  textInputLabel.htmlFor = "text";
  textInputLabel.textContent = "Your comment:";
  textInput.className = "commentInput";
  textInput.type = "text";
  textInput.name = "text";
  textInput.id = "text";
  usernameInputDiv.className = "commentInputDiv";
  usernameInputLabel.className = "commentInputLabel";
  usernameInputLabel.htmlFor = "username";
  usernameInputLabel.textContent = "Your username:";
  usernameInput.className = "commentInput";
  usernameInput.type = "text";
  usernameInput.name = "username";
  usernameInput.id = "username";
  usernameInput.autocomplete = true;
  submitBtn.type = "submit";
  submitBtn.textContent = "Publish comment";
  backBtn.addEventListener("click", () => {
    showPost(id);
  });
  textInputDiv.appendChild(textInputLabel);
  textInputDiv.appendChild(textInput);
  form.appendChild(textInputDiv);
  usernameInputDiv.appendChild(usernameInputLabel);
  usernameInputDiv.appendChild(usernameInput);
  form.appendChild(usernameInputDiv);
  form.appendChild(submitBtn);
  contentDiv.appendChild(addCommentHeading);
  contentDiv.appendChild(backBtn);
  contentDiv.appendChild(form);
}

export { addBtnEventListeners, renderPosts, renderPost, userStatusDisplay };