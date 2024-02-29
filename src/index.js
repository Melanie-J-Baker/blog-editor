import {
  addBtnEventListeners,
  renderPosts,
  renderPost,
  userStatusDisplay,
} from "./render";

let contentDiv = document.getElementById("content");
let posts = [];
let comments = [];
let post;

async function signup(e, username, password) {
  e.preventDefault();
  await fetch("http://localhost:3000/blog/signup/", {
    mode: "cors",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      username: username.toString(),
      password: password.toString(),
    }),
  })
    .then(function (response) {
      if (response.ok) {
        const data = response.json();
        return data;
      } else {
        throw new Error("Something went wrong!");
      }
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      //Failure
      alert("Error: err");
    });
}

async function login(e, username, password) {
  e.preventDefault();
  await fetch("http://localhost:3000/blog/login/", {
    mode: "cors",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      username: username.toString(),
      password: password.toString(),
    }),
  })
    .then(function (response) {
      if (response.ok) {
        const data = response.json();
        return data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(function (data) {
      let inMemoryToken = data.token;
      localStorage.setItem("user", username);
      localStorage.setItem("token", inMemoryToken);
      contentDiv.textContent = username + " is logged in";
      setTimeout(() => {
        createPosts();
      }, 3000);
    })
    .catch(function (err) {
      //Failure
      alert("Something went wrong!");
    });
}

async function fetchPosts() {
  try {
    const response = await fetch("http://localhost:3000/blog/posts", {
      mode: "cors",
    });
    if (response.ok) {
      posts = await response.json();
    } else {
      throw new Error(
        JSON.stringify({ code: response.status, message: response.statusText })
      );
    }
  } catch (error) {
    alert(error);
  }
}

async function fetchPost(id) {
  try {
    const response = await fetch("http://localhost:3000/blog/posts/" + id, {
      mode: "cors",
    });
    if (response.ok) {
      post = await response.json();
    } else {
      throw new Error(
        JSON.stringify({
          code: response.status,
          message: response.statusText,
        })
      );
    }
  } catch (error) {
    alert(error);
  }
}

async function fetchComments(id) {
  try {
    const response = await fetch(
      "http://localhost:3000/blog/posts/" + id + "/comments",
      {
        mode: "cors",
      }
    );
    if (response.ok) {
      comments = await response.json();
    } else {
      throw new Error(
        JSON.stringify({
          code: response.status,
          message: response.statusText,
        })
      );
    }
  } catch (error) {
    alert(error);
  }
}

async function submitCommentForm(e, id, text, username) {
  e.preventDefault();
  await fetch("http://localhost:3000/blog/posts/" + id + "/comments/", {
    mode: "cors",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      text: text.toString(),
      username: username.toString(),
    }),
  })
    .then(function (response) {
      const data = response.json();
      return data;
    })
    .then(function (data) {
      showPost(data.post);
      if (text) {
        alert("Comment created: " + text);
      }
      return;
    })
    .catch(function (err) {
      //Failure
      alert("Error: err");
    });
}

async function showPost(id) {
  contentDiv.textContent = "";
  await fetchPost(id);
  await fetchComments(id);
  renderPost(post, comments);
  userStatusDisplay();
}

async function createPosts() {
  contentDiv.textContent = "";
  await fetchPosts();
  renderPosts(posts);
  userStatusDisplay();
}

async function deletePost(id) {
  let inMemoryToken = localStorage.getItem("token");
  try {
    const response = await fetch(
      "http://localhost:3000/blog/posts/" +
        id +
        "/?" +
        new URLSearchParams({
          secret_token: inMemoryToken,
        }),
      {
        mode: "cors",
        method: "delete",
        headers: {
          Authorization: `Bearer ${inMemoryToken}`,
        },
      }
    );
    if (response.ok) {
      let result = await response.json();
      contentDiv.textContent = JSON.stringify(result);
      setTimeout(() => {
        createPosts();
      }, 3000);
    } else {
      throw new Error(
        JSON.stringify({
          code: response.status,
          message: response.statusText,
        })
      );
    }
  } catch (error) {
    alert(error);
  }
}

addBtnEventListeners();
createPosts();

export { signup, login, submitCommentForm, showPost, createPosts, deletePost };