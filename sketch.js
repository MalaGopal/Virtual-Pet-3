var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var garden,washroom,bedroom;
var gameState;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  garden = loadImage("Images/Garden.png");
  washroom = loadImage("Images/Wash Room.png");
  bedroom = loadImage("Images/Bed Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  readState = database.ref("gameState/gameState");
  readState.on("value",function(data){
    gameState = data.val();
    console.log(gameState)
  });

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  currentTime = hour();


  if(currentTime === (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime  === (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime >= (lastFed+2) && currentTime <= (lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
console.log(gameState)
  if(gameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else if(gameState === "Hungry"){
    console.log("Feedtime")
      feed.show();
      addFood.show();
      dog.addImage(sadDog);
  }
  console.log(hour())
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref("gameState").set({
    gameState:state
  })
}