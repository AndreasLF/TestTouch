var canvas;
var ctx;
var lastPoint = null;
var color = 'black';

function initialize(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("touchmove", touchHandler, false);
    canvas.addEventListener("touchend", end, false);
    
    
    
}

function touchHandler(event) {
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    var coor = "x: " + x + "  y: " + y;
    document.getElementById("coordinates").innerHTML=coor;
}

function draw(event) {
    
    var canvasElement = document.getElementById("myCanvas"); //stores the canvas element in a variable
    var offsetTop = getOffset(canvasElement).top; //stores the offsetTop of the canvas
    var offsetLeft = getOffset(canvasElement).left; //stores the offsetLeft of the canvas
    
    
    console.log("offsetTop: " + offsetTop + " offsetLeft: " + offsetLeft); //This prints the offset to the console log, which is useful for debugging 
    
    if (lastPoint!=null) { //If the value of lastPoint is null, this code will execute
    ctx.beginPath(); //This begins a new path
    ctx.moveTo(lastPoint.x, lastPoint.y); //tells which point is the beginning beginning of the line
    ctx.lineTo(event.touches[0].pageX - offsetLeft, event.touches[0].pageY - offsetTop); //tells which point the line should be drawn to
    ctx.strokeStyle = color;
    ctx.stroke(); //this draws the line
    }
    
    
     lastPoint = {x:event.touches[0].pageX - offsetLeft, y:event.touches[0].pageY - offsetTop}; //This stores the last point
}


function end(event) {
    event.preventDefault(); //preventDefault cancels an event
    lastPoint = null; //sets the lastPoint to null. This will prevent it from connecting the lines if i draw a new line
}

function getOffset(element) {
    return {left: element.offsetLeft, top: element.offsetTop} //an object with the poperties for left and right offset is returned 
}

function getColor() {
    return {black:'black', grey:'grey', red:'red', blue:'blue', yellow:'yellow', green:'green'};
}

function changeColor(c) {
    color = c; 
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}