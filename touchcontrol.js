function initialize(){
    var touchzone = document.getElementById("touchzone");
    touchzone.addEventListener("touchstart", touchHandler, false);
}

function touchHandler(event) {
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    var coor = "x: " + x + "  y: " + y;
    document.getElementById("coordinates").innerHTML=coor;
}