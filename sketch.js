
var dog,happyDog,database,foodS,foodStock;
var pet;
var feed,addFood;
var lastFed,fedTime;
var foodObj,foodObj1,foodObj2,foodObj3;

function preload()
{
  dog = loadImage("Dog (1).png");
  
  happyDog = loadImage("happydog (1).png");
}

function setup() {
  createCanvas(800,700);
  
  database = firebase.database();

  pet = createSprite(400,450,200,20);
  pet.addImage(dog);
  pet.scale = 0.3;

  foodStock = database.ref("food");
  foodStock.on("value",readStock,showError);

  foodObj = new food();
  foodObj1= new food();
  foodObj2= new food();
  foodObj3= new food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  

  addFood = createButton("Add Food");
  addFood.position(800,95);
  
}


function draw() {  
background(46,139,87);

feed.mousePressed(feedDog);
addFood.mousePressed(addFoods);

foodObj.display();
foodObj1.display();
foodObj2.display();
foodObj3.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
    lastFed = data.val();
})

  fill("white");
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed+"AM",350,30);
  }
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }

  database.ref("/").set({
    food:x
  })

}

function showError(){
  console.log("Error Occured");
}

function feedDog(){
  pet.addImage(happyDog);

  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    FeedTime:hour(),
    //food:foodObj.getFoodStock()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}



