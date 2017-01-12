var canvas;
var ctx;
var lastPoint = null;
var color = 'black';

function initialize(){
    addEventListener("deviceready", onDeviceReady, false);  
    
    canvas = document.getElementById("myCanvas");    
    ctx = canvas.getContext("2d");
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("touchend", end, false);
    
    var buttonDivHeight = document.getElementById("buttonDiv").offsetHeight;
     ctx.canvas.width  = window.innerWidth;
     ctx.canvas.height = window.innerHeight - getOffset(canvas).top - buttonDivHeight - 10;
    
    console.log("windowInnerHeight: " + window.innerHeight);
    console.log("canvasOffsetTop: " + getOffset(canvas).top);
    console.log( "buttonDivHeight: " + buttonDivHeight);
    console.log("canvasHeight: " + document.getElementById("myCanvas").offsetHeight);
    
}

function onDeviceReady() {
    vibrate();
}

function vibrate() {
    navigator.vibrate(1000);
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
    return {black:'#212121', grey:'#9e9e9e', red:'#f44336', blue:'#2196f3', yellow:'#ffeb3b', green:'#4caf50'};
}

function changeColor(c) {
    color = c; 
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vibrate();
}