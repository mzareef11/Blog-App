
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || false;

if (!currentUser) {
  location = '../index.html';
}

const renderUserName = () => {
  let span = document.getElementsByClassName('user-welcome');
  span[0].innerHTML = `<i class="fas fa-user-circle me-1"></i>Welcome, ${currentUser.fullName}!`;
}

renderUserName();

const loadFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

let blogs = loadFromLocalStorage("blogs");

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

function renderBlogs() {
  let blogPostsContainer = document.getElementById("blogPosts");
  blogPostsContainer.innerHTML = "";
  for (let i = 0; i < blogs.length; i++) {
    blogPostsContainer.innerHTML += `
        <div class="col-md-6 col-lg-4">
            <div class="card blog-card">
                <div class="card-header">
                    <h5 class="card-title text-white mb-0">${blogs[i].title}</h5>
                </div>
                <div class="card-body">
                    <p class="text-muted"><i class="fas fa-user me-2"></i>By ${blogs[i].author}</p>
                    <p class="card-text">${blogs[i].content}</p>
                </div>
                <div class="card-footer bg-white">
                    <div class="d-flex justify-content-between">
                        <small class="text-muted"><i class="fas fa-clock me-1"></i>${blogs[i].timestamp}</small>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-thumbs-up"></i></button>
                            <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-comment"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

document.getElementById('blogForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let title = document.getElementById("blogTitle").value;
  let author = document.getElementById("blogAuthor").value;
  let content = document.getElementById("blogDescription").value;

  if (title.trim() == "" || author.trim() == "" || content.trim() == "") {
    alert("Please fill out fields.");
    this.reset();
    return;
  }

  blogs.unshift({ title, author, content, timestamp: new Date().toLocaleString() });

  renderBlogs();

  this.reset();

  alert("Blog posted successfully!");

  saveToLocalStorage("blogs", blogs);
});

renderBlogs();

const logout = () => {
  location = '../index.html';
  localStorage.removeItem("currentUser");
}
