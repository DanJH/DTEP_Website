const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
var server = {
    users: [],
    board: []
};

app.use(express.static(__dirname + "/public"));
io.on("connection", function(socket) {
    server.users.push({ 
        id: socket.id
        
    });
    console.log(socket.id, "connected");

io.on("coffeeMade", function(){   
    console.log(socket.id, "madeCoffee")
});
    // Send connecting socket.id the board



    socket.on("disconnect", function() {
        //console.log(socket.handshake.address + " disconnected.");

        for (var i in server.users) {
            if (server.users[i].id == socket.id) {
                server.users.splice(i, 1);
                //io.emit("serverData", server);
            }
        }
    });
});

http.listen(port, () => console.log("Listening on port " + port));
