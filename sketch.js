var ship,ship_design,ship_explosion;
var hull,hull_sym,hull_show,hull_dis;
var shield,shield_sym,shield_show,shield_dis;
var back,back_image;
var gameState = "stand-by";
var asteroid_design,asteroids;
var statsHolder,s_stats,h_stats;
var topEdge,bottomEdge,leftEdge,rightEdge,edges;
var highscore,score;
var laser,asteroid;
highscore = 0;

function preload() {
  createCanvas(400,400);
  asteroids = createGroup();
  edges = createGroup();
  back_image = loadImage("Star3.png");
  ship_design = loadImage("ship_base.png");
  ship_explosion = loadImage("explosion.png");
  asteroid_design = loadImage("asteroid.png");
  hull_sym = loadImage("hull_sym.png");
  shield_sym = loadImage("shield_sym.png");
}

function setup() {
  score = 0;
  hull = 250;
  shield = 375;
  back = createSprite(300,300,600,600);
  back.addImage("stars",back_image);
  statsHolder = createSprite(50,325,100,175);
  hull_show = createSprite(25,340,20,125);
  hull_show.shapeColor="red";
  hull_dis = createSprite(25,260);
  hull_dis.addImage(hull_sym);
  shield_show = createSprite(75,340,20,125);
  shield_show.shapeColor="cyan";
  shield_dis = createSprite(75,260);
  shield_dis.addImage(shield_sym);
  ship = createSprite(200,350);
  ship.addImage("ship",ship_design);
  ship.addImage("explosion",ship_explosion);
  ship.scale = 0.4;
  topEdge = createSprite(200,0,400,10);
  topEdge.visible=false;
  edges.add(topEdge);
  bottomEdge = createSprite(200,400,400,10);
  bottomEdge.visible=false;
  edges.add(bottomEdge);
  leftEdge = createSprite(0,200,10,400);
  leftEdge.visible=false;
  edges.add(leftEdge);
  rightEdge = createSprite(400,200,10,400);
  rightEdge.visible=false;
  edges.add(rightEdge);
}


function draw() {
  background("black");
  if(gameState=="stand-by"){
    textSize(18);
    fill("red");
    text("Press the spacebar to continue",70,140);
    fill("cyan");
    text("Use W, A, S and D to move",80,176);
    fill("white");
    text("Avoid as many asteroids as possible!",45,212);
    ship.visible=false;
    statsHolder.visible=false;
    hull_show.visible=false;
    hull_dis.visible=false;
    shield_show.visible=false;
    shield_dis.visible=false;
    back.visible=false;
    if(keyDown("space")){
      gameState="play";
    }
  if(gameState=="play"){
    ship.visible=true;
    statsHolder.visible=true;
    hull_show.visible=true;
    hull_dis.visible=true;
    shield_show.visible=true;
    shield_dis.visible=true;
    back.visible=true;
    }
  }
  if(gameState=="play"){
    score=score+1;
    back.velocityY=+10;
    if(keyWentDown("x")){
      laser = createSprite(ship.x,ship.y-25,5,10);
      laser.shapeColor = "green";
      laser.velocityY= -10;
      laser.bounceOff(edges);
    }
    if(score>=highscore){
      highscore=score;
    }
    if(keyDown("up")||keyDown("w")){
      ship.y = ship.y-7;
      }
    if(keyDown("down")||keyDown("s")){
      ship.y = ship.y+4;
      }
    if(keyDown("left")||keyDown("a")){
      ship.x = ship.x-5;
        }
    if(keyDown("right")||keyDown("d")){
      ship.x = ship.x+5;
        }
    }
    if(back.y == 1420){
      back.y = -90;
    }
    if(ship.isTouching(asteroids)){
      if(shield>0){
        shield = shield-3;
        shield_show.y = shield_show.y+1;
      }
      if(shield<=0){
        shield=0;
        hull = hull-6.25;
        hull_show.y = hull_show.y+3.125;
      }
      if(hull<=0){
        hull=0;
        ship.changeImage("explosion",ship_explosion);
        back.velocityY=0;
        gameState="defeat";
      }
    }
  if(gameState=="defeat"){
    textSize(18);
    fill("red");
    text("Defeat!",175,140);
    fill("yellow");
    text("Press the spacebar to re-start",90,176);
    ship.visible=false;
    statsHolder.visible=false;
    hull_show.visible=false;
    hull_dis.visible=false;
    shield_show.visible=false;
    shield_dis.visible=false;
    back.visible=false;
    if(keyDown("space")){
      setup();
      gameState="play";
    }
  }
    ship.collide(statsHolder);
    ship.collide(edges);
  ast_spawn();
  drawSprites();
  if(gameState=="play"){
    textSize(18);
    fill("white");
    text("Score: " + score, 275,50);
    text("Highscore: " + highscore, 275,70);
    textSize(12);
    fill("blue");
    text(shield, 64,265);
    fill("white");
    text(hull, 15,265);
  }
}
function ast_spawn(){
  if(gameState=="play"){
    if(frameCount % 15 == 0){
      asteroid = createSprite(200,0,20,20);
      asteroid.x = Math.round(random(1,400));
      asteroid.velocityY = 2;
      asteroid.addImage(asteroid_design);
      asteroids.add(asteroid);
    }
  }
}