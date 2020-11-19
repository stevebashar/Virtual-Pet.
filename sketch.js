//Create variables here
var dog, dogImg,dogImg1
var database;
var foodS,foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(46,169,97);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  drawSprites();
  fill(255,255,250);
  stroke("black");
  text("Food remaining: "+foodS,170,200);
  textSize(13);
  text("Note: Press Up Arrow Key to Feed Drago Milk!",130,10);
  //add styles here

}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
if(x<=0){
  x=0;
}else{
  x=x -1;
  }
  database.ref('/').update({
    Food:x
  })
}


