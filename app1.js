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
    var landscape = new Image();
    landscape.src = "landscape.png";
    
    var skeleton = new Image();
    skeleton.src = "Zelda-Inv.png";
    
    
    skeleton.addEventListener("load", function(){
        context.drawImage(landscape, 80,0);
        context.drawImage(skeleton, sx, sy, 64, 64, dx, dy, 64, 64);
        

    });
    if(u){
        context.font = "16px monospace";
        context.strokeText(u.email, dx - 30, dy + 80);
    }
}

window.addEventListener("keydown", function(e){
    currentXFrame++;
    //dy=390;
    if(currentXFrame > totalXFrames){
        currentXFrame = 0;
    }
    console.log(e);
    console.log(dx);
    switch(e.key){
        case 'q':{
            dx = 50;
            dy = 390;
            sx = currentXFrame * frameSize;
            // console.log("up");
            break;
        }
        case 'ArrowLeft':{
           if(dx>50 && dx<1231){
                dx -= 10;
                sy = 0 * frameSize;
                sx = currentXFrame * frameSize;
                console.log(dx);
                }
          
                if(dx> 930 && dx<1220){
                    dx -= 10;
                    dy -=1
                    sy = 0 * frameSize;
                    sx = currentXFrame * frameSize;
                    console.log(dx + "this also");
                    }
                    
                if(dx>620 && dx<930){
                    dx -= 10;
                    dy +=3.5;
                    sy = 0 * frameSize;
                    sx = currentXFrame * frameSize;
                                console.log(dx + "this hit");
                                console.log(dy);
                                }        
            
            if(dx>520 && dx<620){
                    dx -= 10;
                    dy -=1;
                    sy = 0 * frameSize;
                    sx = currentXFrame * frameSize;
                    console.log(dx);
                    console.log(dy);
                    }
            if(dx>320 && dx<520){
                        dx -= 10;
                        
                        sy = 0 * frameSize;
                        sx = currentXFrame * frameSize;
                        console.log(dx);
                        console.log(dy);
            }

            if(dx>50 && dx<320){
            dx -= 10;
            dy+=1;
                        sy = 0 * frameSize;
                        sx = currentXFrame * frameSize;
                        console.log(dx + "that's hitting");
                        console.log(dy);
            }
            if(dx<49){
                dx -= 0;
                
                sy = 0 * frameSize;
                sx = currentXFrame * frameSize;
                console.log(dx+ "does that hit?");
                console.log(dy);
                }
          
            break;
        }
        case 'x':{
            
            sy = 5 * frameSize;
            sx = currentXFrame * frameSize;

            //animation: swing 0.5s steps(9)
            
            break;
        }
        case 'ArrowRight':{
            if(dx<320){
                dx += 10;
                dy -=1;
                sy = 1 * frameSize;
                sx = currentXFrame * frameSize;
                console.log(dx + "this");
                console.log(dy);
                }
            if(dx>520 && dx<610){
                    dx += 10;
                    dy +=1;
                    sy = 1 * frameSize;
                    sx = currentXFrame * frameSize;
                    console.log(dx + "this hit");
                    console.log(dy);
                    }
            if(dx>620 && dx<930){
            dx += 10;
            dy +=-3.5;
            sy = 1 * frameSize;
            sx = currentXFrame * frameSize;
                        console.log(dx + "this hit");
                        console.log(dy);
                        }        
            if(dx> 930 && dx<1220){
            dx += 10;
            dy +=1
            sy = 1 * frameSize;
            sx = currentXFrame * frameSize;
            console.log(dx + "this also");
            }
            if(dx<1221){
                dx += 10;
                
                sy = 1 * frameSize;
                sx = currentXFrame * frameSize;
                console.log(dx + "this also");
             }
           
            break;
        }
    }
   // @keyframes swing{
    //    100% {} }
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