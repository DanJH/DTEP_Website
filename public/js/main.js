/* variable launch */
var socket = io();
var lastFrame;
var fps;
var zed;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var outputColor = '#111'
var mouse = {
    down: false,
    x: 0,
    y: 0
};



/* Client init */

//Mouse down = draw

//Mouse up = no draw
$("canvas").mouseup(function() {
    mouse.down= false;
});

// Send events
$("canvas").mousemove(function(e) {
    // Update the position of the mouse
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // Draw when dragging #Depreciated
    if (mouse.down) {
        newObject();
    }
});

//Message sent on "return"
$("#console input").on("keyup", function(e) {
    if (e.keyCode == 13) {
        socket.emit("chatMessage", {
            msg: $(this).val(),
            user: player.name,
            color: player.color
        });
        $(this).val("");
    }
});

//Creates circle
function makeCoffee(){
    socket.emit("coffeeMade");
}


/* Receive events */
socket.on("connect", function() {
    console.log("User ID: " + socket.id);
});



socket.on("serverData", function(data) {
    // Display object as ul
    $("ul").empty();
    
    $.each(data, function(i) {
        // TODO: more accurately represent the data
        var li = $('<li/>').appendTo($('#serverData ul'));
        $('<span/>').text(i + ": " + JSON.stringify(data[i])).appendTo(li);
    });
});

socket.on("disconnect", function(data) {
    console.log("Disconnected");
});

function resize() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
resize();
$(window).resize(resize);
