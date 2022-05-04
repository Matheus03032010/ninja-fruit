const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var button
var bunny;
var blink,eat,sad;

var mute
var balão

var bk_song;  // SOM DO BG
var cut_sound;  // SOM CORTANTO A CORDA
var sad_sound;  // SOM TRISTE
var eating_sound; // SOM COMENDO
var air;  /// SOM DO AR

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
 
  eat.looping=false
  sad.looping=false
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  button=createImg("cut_btn.png")
  button.position(220,30)
  button.size(50,50) 
  button.mouseClicked(cortar)
  balão=createImg("balloon.png")
  balão.position(50,295)
  balão.size(100,100)
  balão.mouseClicked(ar)
  mute=createImg("mute.png")
  mute.position(100,30)
  mute.size(50,50)
  mute.mouseClicked(xiu)


  blink.frameDelay=20
  eat.frameDelay = 20;
  bunny = createSprite(350,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);  // começa com essa! 
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  
}

function draw() {
  background(51);
  Engine.update(engine);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  ground.show();
  drawSprites()

  if(collision(fruit,bunny)){
    bunny.changeAnimation("eating")
    eating_sound.play()
  }
  if(collision(fruit,ground.body)){
    bunny.changeAnimation("crying")
    fruit = null
    sad_sound.play()
  }
}
function ar(){
air.play()
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0.0})
}
function xiu(){
if(bk_song.isPlaying()){
  bk_song.stop()
}else{
  bk_song.play()
}
}

function cortar(){
  rope.break()
  fruit_con. detach()
  cut_sound.play()
}
 
function collision(bodie,sprite){
  if(bodie!=null){
    var distancia = dist(bodie.position.x,bodie.position.y,sprite.position.x,sprite.position.y)
    if(distancia<=80){
      World.remove(world,bodie)
      fruit=null  
      return true
    }else{
      return false
    }
  }
}
