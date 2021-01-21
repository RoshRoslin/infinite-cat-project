const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
const dogPosts = document.getElementById("dog-posts");

let limit = 5;
let page = 1;
let counter = 0;

//fetch posts from API
async function getPosts() {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&order=Desc`
  );
  const data = await response.json();

  return data;
}

//show posts in DOM

async function showPosts() {
  const posts = await getPosts();

  posts.forEach(function (post) {
    counter++;
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <img src="${post.url}" class="image">
    <div class="number">${counter}</div>
    <div class="post-info>
      <h2 class="post-title></h2>
      
    </div>
    `;
    postsContainer.append(postEl);
  });
}

//show loader and fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(function () {
    loading.classList.remove("show");

    setTimeout(function () {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// //filter posts by input
// function filterPosts(e) {
//   const term = e.target.value.toUpperCase();
//   const posts = document.querySelectorAll(".post");

//   posts.forEach(function (post) {
//     const title = post.querySelector(".post-title").innerText.toUpperCase();
//     const body = post.querySelector(".post-body").innerText.toUpperCase();

//     if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
//       post.style.display = "flex";
//     } else {
//       post.style.display = "none";
//     }
//   });
// }

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

// filter.addEventListener("input", filterPosts);

//show initial posts
showPosts();
