var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
var x = 125;
var y = 300;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame


const placeCharacter = () => {
  var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
  const held_direction = held_directions[0];
  if(held_direction) {
    if (held_direction === directions.right) {x += speed;}
    if (held_direction === directions.left) {x -= speed;}
    if (held_direction === directions.down) {y += speed;}
    if (held_direction === directions.up) {y -= speed;}
    character.setAttribute("facing", held_direction);
  }
  character.setAttribute("walking", held_direction ? "true" : "false");

  var camera_left = pixelSize * 66;
  var camera_top = pixelSize * 42;
  
  map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
  character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;
}

var gdcCollidable = Boolean(true);
var mccombsCollidable = Boolean(true);
var pclCollidable = Boolean(true);
var gregCollidable = Boolean(true);
var jesterCollidable = Boolean(true);

//Popups
var gdcfacts = document.querySelector(".gdcfacts");
var mccombsfacts = document.querySelector(".mccombsfacts");
var pclfacts = document.querySelector(".pclfacts");
var gregfacts = document.querySelector(".gregfacts");
var jesterfacts = document.querySelector(".jesterfacts");

gdcfacts.style.display = "none";
var gdcIsHidden = false;
mccombsfacts.style.display = "none";
var mccombsIsHidden = false;
pclfacts.style.display = "none";
var pclIsHidden = false;
gregfacts.style.display = "none";
var gregIsHidden = false;
jesterfacts.style.display = "none";
var jesterIsHidden = false;

const step = () => {
  placeCharacter();
  window.requestAnimationFrame(() => {
    step();
  })

   //Retrieving element
   var character_id = document.querySelector(".character");
   var gdc = document.querySelector(".gdc");
   var mccombs = document.querySelector(".mccombs");
   var pcl = document.querySelector(".pcl");
   var greg = document.querySelector(".greg");
   var jester = document.querySelector(".jester");

   //Getposition 
   var character_rect = character_id.getBoundingClientRect();
   var gdc_rect = gdc.getBoundingClientRect();
   var mccombs_rect = mccombs.getBoundingClientRect();
   var pcl_rect = pcl.getBoundingClientRect();
   var greg_rect = greg.getBoundingClientRect();
   var jester_rect = jester.getBoundingClientRect();

   //Character touching GDC 
   if (character_rect.left < gdc_rect.right && character_rect.right > gdc_rect.left && character_rect.top < gdc_rect.bottom && 
      character_rect.bottom > gdc_rect.top) {
      if(gdcCollidable) {
        console.log("COLLIDE");
        gdcfacts.style.display = "block";
        setTimeout(function(){
           gdcfacts.style.display = gdcIsHidden ? "block" : "none";
           gdcIsHidden = !gdcIsHidden;
         }, 15000);
         gdcCollidable = Boolean(false);
      }
   }

   //Character touching Mccombs
   if (character_rect.left < mccombs_rect.right && character_rect.right > mccombs_rect.left && character_rect.top < mccombs_rect.bottom && 
      character_rect.bottom > mccombs_rect.top) {
      if(mccombsCollidable) {
        console.log("COLLIDE");
        mccombsfacts.style.display = "block";
        setTimeout(function(){
           mccombsfacts.style.display = mccombsIsHidden ? "block" : "none";
           mccombsIsHidden = !mccombsIsHidden;
         }, 15000);
        mccombsCollidable = Boolean(false); 
      }
   }

   //Character touching PCL 
   if (character_rect.left < pcl_rect.right && character_rect.right > pcl_rect.left && character_rect.top < pcl_rect.bottom && 
      character_rect.bottom > pcl_rect.top) {
      if(pclCollidable) {
        console.log("COLLIDE");
        pclfacts.style.display = "block";
        setTimeout(function(){
           pclfacts.style.display = pclIsHidden ? "block" : "none";
           pclIsHidden = !pclIsHidden;
         }, 15000);
        pclCollidable = Boolean(false);
      }
   }

   //Character touching Greg 
   if (character_rect.left < greg_rect.right && character_rect.right > greg_rect.left && character_rect.top < greg_rect.bottom && 
      character_rect.bottom > greg_rect.top) {
      if(gregCollidable) {
        console.log("COLLIDE");
        gregfacts.style.display = "block";
        setTimeout(function(){
           gregfacts.style.display = gregIsHidden ? "block" : "none";
           gregIsHidden = !gregIsHidden;
         }, 15000);
        gregCollidable = Boolean(false);
      }
   }

   //Character touching Jester 
   if (character_rect.left < jester_rect.right && character_rect.right > jester_rect.left && character_rect.top < jester_rect.bottom && 
      character_rect.bottom > jester_rect.top) {
      if(jesterCollidable) {
        console.log("COLLIDE");
        jesterfacts.style.display = "block";
        setTimeout(function(){
           jesterfacts.style.display = jesterIsHidden ? "block" : "none";
           jesterIsHidden = !jesterIsHidden;
         }, 15000);
        jesterCollidable = Boolean(false);
      }
   }
}
step();

const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
}

const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
}

document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});
