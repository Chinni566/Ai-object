objectDetector="";
status ="";
objects =[];
input_text="";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
  }

  function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded); 
    document.getElementById("status").innerHTML="Status : Detecting Objects" ;
    input_text = document.getElementById("object_name").value
}

function modelLoaded(){
  console.log("Model Loaded!")
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function draw(){
  image(video,0,0,480,380);

  if(status  !=""){
 
  objectDetector.detect(video, gotResults);
  for(i=0; i < objects.length; i++){
    document.getElementById("status").innerHTML="Status : Object Detected" ; 
    console.log(objects.length);
    fill("#FF0000");
    percent = floor(objects[i].confidence*100);
    text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15 );
    noFill();
    stroke("#FF0000");
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

    if(objects[i].label==input_text){
      video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("object_found").innerHTML=input_text+"Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(input_text+"Found");
        synth.speak(utterThis);
    }

    else {
      document.getElementById("object_found").innerHTML=input_text+"Not Found";
    }
  }

}
}

function gotResults(error, results){
  if (error) {
     console.log(error);
  }

else{
  console.log(results);
  objects = results;
}
 
}


