var canvas, ctx; //stores canvas and context of the canvas
var lastPoint = null; //stores the last point. Used for drawing
var color = 'black'; //stores the drawing color
var sideNavOpen = false; //stores information about whether or not the sideNav menu is open
var dropdownOpen = false; //stores information about whether or not the sideNav menu is open
var penSize = 1; //stores the pen size
var img = new Image(); //stores the background image for the canvas
var pictureTaken = false; //stores information about whether or not a picture was taken

function initialize(){
    addEventListener("deviceready", onDeviceReady, false); //When the device is ready the onDEviceReady function runs 
    window.addEventListener("resize", canvasResize, false); //When window resizes canvasResize() runs
    
    canvas = document.getElementById("myCanvas"); //Gets the canvas element and stores it in the global variable "canvas"
    ctx = canvas.getContext("2d"); //Stores the 2d context of the canvas in the global variable "ctx"
    canvas.addEventListener("touchmove", touchMove, false); //When the finger is moving on the screen, touchMove() runs 
    canvas.addEventListener("touchend", touchEnd, false); //When the figner is released from the screen, touchEnd() runs
    
    canvasResize(); //calls the resizeCanvas() function
    
    if(pictureTaken == true) {
        ctx.drawImage(img, 0, 0);    
        ctx.fillRect(0,0,0,0);
    }
}

function canvasResize(){
                canvas.width  = window.innerWidth; //sets canvas width to window.innerWidth
                canvas.height = window.innerHeight - getOffset(canvas).top; //sets the canvas height to the window.innerHeight - the offset
}

function onDeviceReady() { //this function is run, when the device is ready. This is needed to load the cordova plugins
    vibrate(); //The function vibrate is called
    takePicture(); //takePicture() is called
}

function vibrate() {
    navigator.vibrate(1000); //Makes the phone vibrate for 1000 milliseconds
}
 

function takePicture() {
    var options = {quality: 50, destinationType: Camera.DestinationType.FILE_URI, encodingType: Camera.EncodingType.JPEG, targetWidth: window.innerWidth, targetHeight: window.innerHeight, correctOrientation: true}; //creates an object named options containing properties for the image options. 
    
    navigator.camera.getPicture(onSuccess, onFail, options); //takes a picture and returns the fileURI to the onSuccess function
}

function onSuccess(imageURI) {
    img.src = imageURI;
    console.log("imageURI: " + imageURI);
    pictureTaken = true;
    initialize();
    
}

function onFail(message) {
    alert(message); //alerts the user if the camera fails to launch
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

function getOffset(element) { //takes a html element as an input
    return {left: element.offsetLeft, top: element.offsetTop} //an object with the poperties for left and right offset is returned 
}

function openNav() {
    
    if (sideNavOpen == false) { //If the sideNav menu is closed this code is run
        document.getElementById("sideNav").style.width = "140px"; //opens the sideNav by changing the width
        sideNavOpen = true; //sideNavOpen is now true
    }
    else { //
        document.getElementById("sideNav").style.width = "0px"; //closes the sideNav by changing the width
        sideNavOpen = false; //sideNavOpen is now false
    }
}

function openMoreOptions() {
    var dropdownElement = document.getElementById("dropdownMenu"); //gets the dropdownMenu div
    
    if (dropdownOpen == false) { //if the dropdownMenu is closed the following code is run 
        dropdownElement.style.visibility = "visible"; //The visibility og the menu is changed to visible
        dropdownOpen = true; //dropdownOpen is now true
    }
    else {
        dropdownElement.style.visibility = "hidden"; //The visibility og the menu is changed to hidden
        dropdownOpen = false; //dropdownOpen is now false
    }
    
}

function getColor() { //This gets a color
    return {black:'#212121', grey:'#9e9e9e', red:'#f44336', blue:'#2196f3', yellow:'#ffeb3b', green:'#4caf50'}; //Returns an object with different colors as properties
}

function changeColor(c) {
    color = c; 
    openNav(); //calls openNav() to close the menu, when color is changed 
}

function clearCanvas() {
    
    if (confirm("Are you sure") == true) { //If the user confirms the following code is run
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears the canvas
        vibrate(); //Phone vibrates
    } 
    openNav(); //calls openNav() to close the menu, when canvas i cleared
}

function setPenSize(n){
    if (n == 'increase') { //if the parameter is 'increase' the following code is run
        penSize++; //increses the penSize
    }
    else if (n == 'decrease') { //if the parameter is 'decrease' the following code is run 
        if(penSize>1) {penSize--}; //decreases the penSize if it is bigger than 1
    }
    
    document.getElementById("penSizeDiv").innerHTML=penSize; //changes the penSize div
}


function share() {
    alert("You can share this link, which provides an apk to be installed right on your phone https://build.phonegap.com/apps/2444680/download/android/?qr_key=9FSJne92p7Pwat3ejMBe");
}

function aboutApp() {
    alert("Drawing <br> Andreas Fiehn <br> Version 2.0 <br>");
}

function sourcecodeLink() {
    window.open("https://github.com/AndreasLF/TestTouch/");
}




