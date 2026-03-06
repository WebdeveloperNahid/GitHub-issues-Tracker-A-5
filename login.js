document.getElementById("btn-sign").addEventListener("click", function(){
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;

    const inputUsername = document.getElementById("input-username");
    const username = inputUsername.value;

    
    if(username == "admin"&& password == "admin123") {
        window.location.assign("home.html");
    }else{
        alert("login field");
        return
    }
});