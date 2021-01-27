var monkey;
var monkey_img;
var banana_img;
var back;
var back_img;
var ground;
var stone_img;
var foodGroup;
var obstaclesGroup;
var score=0;

function preload(){
  
  monkey_img=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_img=loadAnimation("banana.png")
  
  stone_img=loadAnimation("stone.png")
  
  back_img=loadAnimation("jungle.jpg")
}


function setup() {
  createCanvas(400, 400);
  
  back=createSprite(390,100,20,20)
  back.addAnimation("scene",back_img)
  back.velocityX=-3
  back.scale=0.8
  
  monkey=createSprite(50,280,10,10);
  monkey.addAnimation("runningm",monkey_img)
  monkey.scale=0.09
  
  foodGroup=createGroup();
  obstaclesGroup=createGroup();
  
  ground=createSprite(50,308,50,2)
  ground.visible=false;
  
}

function draw() {
  background(220)
  
  if(back.x<0){
    back.x=400
  }
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score=score+2
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.scale=0.09
    obstaclesGroup.destroyEach();
    score=score-2
  }
  
  spawnBanana()
  
  if(keyDown("space")&&monkey.y>260){
    monkey.velocityY=-12
  }
  
  switch(score){
    case 10: monkey.scale=0.11;
      break;
    case 20: monkey.scale=0.12;
      break;
    case 30: monkey.scale=0.13;
      break;
    case 40: monkey.scale=0.14;
      break;
    default : break;
  }                   
  
  monkey.velocityY=monkey.velocityY+0.9
  
  monkey.collide(ground);
  
  spawnStones();
  
  drawSprites();
  
  stroke("white")
  textSize(20)
  text("score: " + score,320,30)
  
}

function spawnBanana(){
  if(frameCount%80==0){
  var banana=createSprite(400,random(180,250),20,20)
  banana.addAnimation("food",banana_img)
    banana.scale=0.03
    banana.velocityX=-5
    banana.lifetime=90
    foodGroup.add(banana);
 }
}

function spawnStones(){
  if(World.frameCount%100==0){
    var stone=createSprite(400,290,20,20)
    stone.velocityX=-7
    stone.addAnimation("obstacle",stone_img)
    stone.scale=0.1
    stone.lifetime=70
    obstaclesGroup.add(stone)
  }
}