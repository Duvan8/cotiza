$('#hola').click(function () {
    var input = document.getElementById("password");
    var inputIcon = document.getElementById("eye");
    if (input.type === "password") {
        input.type = "text";
        inputIcon.className = "fa fa-eye";
    } else {
        input.type = "password";
        inputIcon.className = "fa fa-eye-slash";
    }
});