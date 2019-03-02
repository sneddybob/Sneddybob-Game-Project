var body = document.querySelector("body");
var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var u;
var sy = 0;
var sx = 0;

var dx = 0;
var dy = 0;

function initializeColor(){
    window.firebase.database().ref('/' + u.uid + '/color').once('value').then(function(snapshot){
        body.style.backgroundColor = snapshot.val();
    });
}


function initializeSkeleton(){
    window.firebase.database().ref('/' + u.uid + '/skeleton').once('value').then(function(snapshot){
        var savedSkeleton = snapshot.val();
        if(savedSkeleton){
            sy = savedSkeleton.sy;
            sx = savedSkeleton.sx;
            dy = savedSkeleton.dy;
            dx = savedSkeleton.dx;
        }
        canvas.style.display = "inline";
        redraw();
    });
    
}

body.addEventListener("click", function(e){
    var currentColor = body.style.backgroundColor;
    var currentColorPosition = colors.indexOf(currentColor);
    var newColorName;
    if((currentColorPosition == -1) || (currentColorPosition == (colors.length - 1))){
        newColorName = colors[0];
    } else{
        newColorName = colors[currentColorPosition + 1];
    }
    window.firebase.database().ref('/' + u.uid + '/color').set(newColorName);
    body.style.backgroundColor = newColorName;

    context.filter
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       u = user;
       
       initializeColor();
       initializeSkeleton();
    } else{
        window.location.href = "./authenticate.html"
    }
});


var canvas = document.querySelector("canvas");

canvas.style.display = "none";

var context = canvas.getContext("2d");
context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;
//canvas.style.backgroundColor = "black";


window.addEventListener("resize", function(){
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
    redraw();
});

var frameSize = 64;


var totalXFrames = 6;
var currentXFrame = 0;


function redraw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    var skeleton = new Image();
    skeleton.src = "Zelda-Inv.png";
    var landscape = new Image();
    landscape.src = "landscape.png";
    
    skeleton.addEventListener("load", function(){
        context.drawImage(skeleton, sx, sy, 64, 64, dx, dy, 64, 64);
        context.drawImage(landscape, 0,0);

    });
    if(u){
        context.font = "16px monospace";
        context.strokeText(u.email, dx - 30, dy + 80);
    }
}

window.addEventListener("keydown", function(e){
    currentXFrame++;
    if(currentXFrame > totalXFrames){
        currentXFrame = 0;
    }
    
    switch(e.key){
        case 'ArrowUp':{
            dy -= 10;
            sy = 0 * frameSize;
            sx = currentXFrame * frameSize;
            // console.log("up");
            break;
        }
        case 'ArrowLeft':{
            dx -= 10;
            sy = 0 * frameSize;
            sx = currentXFrame * frameSize;
            // console.log("left");
            break;
        }
        case 'ArrowDown':{
            dy += 10;
            sy = 2 * frameSize;
            sx = currentXFrame * frameSize;
            // console.log("down");
            break;
        }
        case 'ArrowRight':{
            dx += 10;
            sy = 1 * frameSize;
            sx = currentXFrame * frameSize;
            // console.log("right");
            break;
        }
    }
    var skeleton = {
        sx: sx, 
        sy: sy, 
        dx: dx, 
        dy: dy
    }
    window.firebase.database().ref('/' + u.uid + '/skeleton').set(skeleton);
    redraw();

})

redraw();