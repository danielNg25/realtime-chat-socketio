var socket = io("http://localhost:8000");

socket.on("server-send-dki-thatbai", function() {
    alert("Ten tai khoan da ton tai");
});

socket.on("server-send-dki-thanhcong", function(data) {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on("server-send-danhsach-Users", function(data) {
    updateUsers(data);
});
socket.on("capnhat-message", function(data) {
    $("#listMessage").append("<div class='message'>" + data.usn + ": " + data.msg + "</div>")
});

socket.on("ai-do-dang-go-chu", function(data) {
    $("#typingNotify").html("<img width='20px' src='typing.gif'>" + data);
});

socket.on("ai-do-stop-go-chu", function(data) {
    $("#typingNotify").html("");
})

$(document).ready(function() {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#txtMessage").focusin(function() {
        socket.emit("toi-dang-go-chu");
    });

    $("#txtMessage").focusout(function() {
        socket.emit("toi-stop-go-chu");
    });

    $("#buttonRegister").click(function() {
        socket.emit("client-send-Username", $("#txtUsername").val());
    });

    $("#btnLogout").click(function() {
        $("#loginForm").show(1000);
        $("#chatForm").hide(2000);
        node
        socket.emit("client-send-dangxuat");
    });
    $("#btnSendMessage").click(function() {
        var message = $("#txtMessage").val();
        if (message != null) {
            socket.emit("client-send-message", message);
            $("#txtMessage").val("");
        }
    });
});

function updateUsers(data) {
    $("#boxContent").html("");
    data.forEach(function(i) {
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    });
}