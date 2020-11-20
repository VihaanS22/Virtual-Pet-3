 var dog, sittingDog, standingDog ,runningDog, eatingDog, sleepingDog, bathingDog
var database
var foodStocks, foodS, Food, foodImg, foodObj
var lastFed, fedTime, currentTime
var back
var feed,add
var eatingSound, whiningSound
var homeImg
var bathImg
var gameState, changeGameState, readGameState


function preload(){

database = firebase.database()
foodStocks = database.ref('food')
foodStocks.on("value", readStock)

eatingSound = loadSound("sounds/Chewing-sound-effect.mp3")
whiningSound = loadSound("sounds/Puppy-whining-sound.mp3")


sittingDog = loadImage("images/dog1.png")
  standingDog = loadImage("images/dog2.png")
  runningDog = loadImage("images/dog4.png")
  eatingDog = loadImage("images/dog3.png")
sleepingDog = loadImage("images/dog5.png")
 bathingDog = loadImage("images/dog7.png")
 homeImg = loadImage("images/bedroom.png")
 bathImg = loadImage("images/bathroom.png")
back = loadImage("images/back.png")
}

function setup() {
	createCanvas(500, 500);
  
readGameState = database.ref('gameState')
readGameState.on("value", function(data){
  gameState = data.val()
})

dog = createSprite(400, 390, 50, 50)
dog.addAnimation("dog_sitting", sittingDog)
dog.addAnimation("dog_standing", standingDog)
dog.addAnimation("dog_running", runningDog)
dog.addAnimation("dog_eating", eatingDog)
dog.addAnimation("dog_sleeping", sleepingDog)
dog.addAnimation("dog_bathing", bathingDog)

foodObj = new Foods()

feed = createButton("FEED FLUPPY")
feed.position(560, 175)
feed.mousePressed(feedDog)

add = createButton("ADD FOOD FOR FLUPPY")
add.position(525, 200)
add.mousePressed(addFood)


}


function draw() {  


 fedTime = database.ref('FeedTime')
 fedTime.on("value", function(data){
   lastFed = data.val();
 })
  //add styles here
  background(back)
  

  foodObj.display();

if(dog.x === 400){
feed.hide()

}
else{
  feed.show()
 
}

if (keyDown("up")) {
 
  dog.changeAnimation("dog_standing",standingDog)
  whiningSound.play();
  eatingSound.stop();
}

if (keyDown("left")) {
  
  dog.changeAnimation("dog_running", runningDog)
  dog.x= 300
  eatingSound.stop();
}


if (keyDown("right")) {
 
  dog.changeAnimation("dog_sitting", sittingDog)
whiningSound.stop();
  eatingSound.stop();
 
  
}

textSize(15)
fill("red")
stroke("white")

if (lastFed>=12) {
  text("LAST FED : "+ lastFed%12 + "PM",  200, 200)

}
else if(lastFed == 0){
text("LAST FED : 12 AM", 200, 200)
}
else{
  text("LAST FED :" +lastFed + "AM", 200, 200)
}

if(gameState!= "Hungry"){

add.hide();
dog.visible = false;
}
else{
  
  add.show();
dog.visible = true;
}

currentTime = hour()

if(currentTime==(lastFed+1)){
  update("Sleeping")
  foodObj.bedroom()
  dog.changeAnimation("dog_sleeping", sleepingDog)
  dog.visible = true
  feed.hide()
  whiningSound.stop()
}
else if(currentTime>(lastFed+1) && currentTime<=(lastFed+2)){
  dog.changeAnimation("dog_bathing", bathingDog)
  update("Bathing")
foodObj.bathroom()
feed.hide()
background(bathImg)


}
else{
update("Hungry")
foodObj.display()

add.show();
}


dog.display();
 drawSprites();

textSize(18)
fill("white")
stroke("orange")
  text(">PRESS THE UP ARROW, THEN THE LEFT!" ,10, 20)
  text(">AND FINALLY PRESS FEED BUTTON TO FEED FLUPPY!", 10, 40)
  text(">AFTER HE FINISHES,", 10, 60)
text(">PRESS RIGHT TO MAKE HIM SIT AGAIN!", 10, 80)
text(">AFTER AN HOUR OF FEEDING, HE'LL GO TO SLEEP!", 10, 100)
text(">AND AFTER 2 HOURS OR SO HE'LL TAKE A BATH!", 10, 120)


}

function readStock(data) {
  foodS = data.val();

}

function writePosition(x){
  if (x<=0) {
    x=0
  } 
  else {
    x=x-1
  }

database.ref('/').update({
  food:x
})



}

function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  dog.changeAnimation("dog_eating", eatingDog)
  whiningSound.stop();
    eatingSound.play();
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



function addFood() {
  foodS++;
  database.ref('/').update({
   food:foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState:state
  })
}