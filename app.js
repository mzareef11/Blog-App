
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || false;

if (currentUser) {
    location.href = './home/home.html';
}

let data = JSON.parse(localStorage.getItem('data')) || [];

function signup() {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (fullName.trim() == "" || email.trim() == "" || password.trim() == "") {
        return;
    }
    let users = window.localStorage.getItem("data");
    users = JSON.parse(users);
    if (users) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                alert("Email is already exist");
                return;
            }
        }
    }

    let newUser = {
        fullName: fullName,
        email,
        password,
    };
    showForm('login');
    data.push(newUser);
    window.localStorage.setItem("data", JSON.stringify(data));
}

const login = () => {
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;
    let getData = window.localStorage.getItem("data");
    getData = JSON.parse(getData);
    let login = false;
    for (let i = 0; i < getData.length; i++) {
        if (getData[i].email === loginEmail && getData[i].password === loginPassword) {
            localStorage.setItem("currentUser", JSON.stringify( getData[i] ));
            login = true;
            break;
        }
    }
    if (login) {
        setTimeout(() => {
            window.location.href = "home/home.html";
        }, 1000);
        alert("Login successfully.");
    } else {
        alert("Invalid credentials.");
    }
}
