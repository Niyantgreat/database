var paintbrush;
var database,position
var drawing=[]
function setup(){
    createCanvas(500,500);
    database=firebase.database()
    paintbrush = createSprite(100,100,10,10);
    paintbrush.shapeColor = "red";
    var ballposition=database.ref('paint brush/position')
    ballposition.on ("value",readposition,showError)

}  
 
function draw(){
 
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,1);
    } 
    drawSprites();
}

function writePosition(x,y){
    
  database.ref('paint brush/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}
function readposition(data){
    position=data.val()
paintbrush.x=position.x
 paintbrush.y=position.y
}
function showError(){
console.log("error")

}
function mouseDragged(){
var point={
    x:mouseX,
    y:mouseY 

    
 
}
drawing.push(point);
var drawingref=database.ref('drawing')
drawingref.set({
    'd':drawing
})
}