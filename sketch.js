var dog;
var happyDog;
var dogImg;
var happyDogImg;
var bedroomImg;
var gardenImg;
var washroomImg;
var database;
var foodS;
var foodStock;
var addFood, feed;
var fedTime, lastFed;
var foodObj;
var gameState;
var state;
var readState;
var currentTime;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomImg = loadImage("images/bedroom.png");
  gardenImg = loadImage("images/garden.png");
  washroomImg = loadImage("images/washroom.png");
}

function setup(){
  createCanvas(400,500);
  
  dog=createSprite(200,400,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodS = 1;


  feed = createButton("Feed Mocha");
  feed.position(400,90);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(500,90);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });
 
}


function draw(){  
  background(46, 139, 87);

  foodObj.display();

    
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display(); 
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    dog.addImage(dogImg);
  }

  drawSprites();

  fill(255,255,244);
  textSize(15);
  text(foodS, 20,30)
  if(lastFed>12){
    text("Last Feed : " + lastFed%12 + "PM", 50, 30);
  }
  else if(lastFed==12){
    text("Last Feed : 12 AM", 50, 30);
  }
  else{
    text("Last Feed : " + lastFed + "PM", 50, 30);
  }

}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour()
  })
}
function addFoods() {
  foodS++;
  database.ref('/').update({
      Food: foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState : state
  });
}