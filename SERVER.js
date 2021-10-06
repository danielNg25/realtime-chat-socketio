var express = require("express");
const { isObject } = require("util");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000);

var mangUsers = [""];

io.on("connection", function(socket) {


    socket.on("client-send-Username", function(data) {
        if (mangUsers.indexOf(data) >= 0) {
            socket.emit("server-send-dki-thatbai");
        } else {

            socket.emit("server-send-dki-thanhcong", data);
            mangUsers.push(data);
            socket.Username = data;
            io.sockets.emit("server-send-danhsach-Users", mangUsers);
        }
    });
    socket.on("client-send-message", function(data) {
        io.sockets.emit("capnhat-message", { usn: socket.Username, msg: data });
    });
    socket.on("client-send-dangxuat", function() {
        deleteUser(socket.Username);
        socket.broadcast.emit("server-send-danhsach-Users", mangUsers);
    });

    socket.on("disconnect", function() {
        deleteUser(socket.Username);
        socket.broadcast.emit("server-send-danhsach-Users", mangUsers);
    });

    socket.on("toi-dang-go-chu", function() {
        socket.broadcast.emit("ai-do-dang-go-chu", "Someone is typing...");
    });
    socket.on("toi-stop-go-chu", function() {
        socket.broadcast.emit("ai-do-stop-go-chu");
    });
});

app.get("/", function(req, res) {
    res.render("trangchu");
});

function deleteUser(username) {
    mangUsers.splice(
        mangUsers.indexOf(username), 1
    )
}