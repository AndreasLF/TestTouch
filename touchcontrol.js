var canvas;
var ctx;
var lastPoint = null;
var color = 'black';
var sideNavOpen = false;
var dropdownOpen = false;
var penSize = 1;

function initialize(){
    addEventListener("deviceready", onDeviceReady, false); //When the device is ready the onDEviceReady function runs 
    window.addEventListener("resize", canvasResize, false); //When window resizes canvasResize() runs
    
    
    
    canvas = document.getElementById("myCanvas"); //Gets the canvas element and stores it in the global variable "canvas"
    ctx = canvas.getContext("2d"); //Stores the 2d context of the canvas in the global variable "ctx"
    canvas.addEventListener("touchmove", touchMove, false); //When the finger is moving on the screen, touchMove() runs 
    canvas.addEventListener("touchend", touchEnd, false); //When the figner is released from the screen, touchEnd() runs
    
    canvasResize();
}

function canvasResize(){
                canvas.width  = window.innerWidth;
                canvas.height = window.innerHeight - getOffset(canvas).top;
}

function onDeviceReady() { 
    vibrate(); //The function vibrate is called
    // Start watching for shake gestures and call "onShake" 
    // with a shake sensitivity of 40 (optional, default 30) 
    shake.startWatch(onShake, 40 /*, onError */);
}

function vibrate() {
    navigator.vibrate(1000); //Makes the phone vibrate for 1000 milliseconds
}
 

function touchMove(event) {
    var offsetTop = getOffset(canvas).top; //stores the offsetTop of the canvas
    var offsetLeft = getOffset(canvas).left; //stores the offsetLeft of the canvas
    
    console.log("offsetTop: " + offsetTop + " offsetLeft: " + offsetLeft); //FOR DEBUGGING - This prints the offset to the console log

    
    if (lastPoint!=null) { //If the value of lastPoint is null, this code will execute
        ctx.beginPath(); //This begins a new path
        ctx.moveTo(lastPoint.x, lastPoint.y); //tells which point is the beginning beginning of the line
        ctx.lineTo(event.touches[0].pageX - offsetLeft, event.touches[0].pageY - offsetTop); //tells which point the line should be drawn to
        ctx.strokeStyle = color; //sets the color of the line
        ctx.lineCap = "round"; //set the lineCap to round so the cap (or end) of the line is round
        ctx.lineJoin = "round"; //rounds the corners when to lines are connected
        ctx.lineWidth = penSize; //sets the lineWidth
        ctx.stroke(); //this draws the line
    }
    
    
     lastPoint = {x:event.touches[0].pageX - offsetLeft, y:event.touches[0].pageY - offsetTop}; //This stores the last point
}


function touchEnd(event) {
    event.preventDefault(); //preventDefault cancels an event
    lastPoint = null; //sets the lastPoint to null. This will prevent it from connecting the lines if a new line is drawn
}

function getOffset(element) {
    return {left: element.offsetLeft, top: element.offsetTop} //an object with the poperties for left and right offset is returned 
}

function openNav() {
    
    if (sideNavOpen == false) {
        document.getElementById("sideNav").style.width = "140px";
        sideNavOpen = true;
    }
    else {
        document.getElementById("sideNav").style.width = "0px";
        sideNavOpen = false;
    }
}

function openMoreOptions() {
    var dropdownElement = document.getElementById("dropdownMenu");
    
    if (dropdownOpen == false) {
        dropdownElement.style.visibility = "visible";
        dropdownOpen = true;
    }
    else {
        dropdownElement.style.visibility = "hidden";
        dropdownOpen = false;
    }
    
}

function getColor() {
    return {black:'#212121', grey:'#9e9e9e', red:'#f44336', blue:'#2196f3', yellow:'#ffeb3b', green:'#4caf50'};
}

function changeColor(c) {
    color = c; 
    openNav();
}

function clearCanvas() {
    
    if (confirm("Are you sure") == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        vibrate();
    } 
    openNav();
}

function setPenSize(n){
    if (n == 'increase') {
        penSize++;
    }
    else if (n == 'decrease') {
        if(penSize>1) {penSize--};
    }
    
    document.getElementById("penSizeDiv").innerHTML=penSize;
}


function onShake() {//This is run when the device gets shaken. The plugin is added in config.xml
    clearCanvas();
};

