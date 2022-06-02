video="";
status = "";
objects=[];
object_name="";

function setup(){
    canvas = createCanvas( 480 , 380);
    canvas.center();
    video = createCapture( VIDEO);
    video.hide();
}

function draw(){
    image(video ,0 ,0 , 480 , 380);

    if(status != ""){
        objectdetector.detect( video , gotresults );
        for(var  i = 0 ; i < objects.length ; i++){

            document.getElementById("status").innerHTML = " Status = Objects detected ";
            

            fill("red");
            text( objects[i].label , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("red");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height );

            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("found/notfound").innerHTML = object_name + " found ";

            }else{
                document.getElementById("found/notfound").innerHTML = object_name + " not found ";
            }
        }

    }

}

function start(){
 objectdetector = ml5.objectDetector("cocossd" , modalLoaded);
 document.getElementById("status").innerHTML = " status : detecting objects";
 object_name=document.getElementById("input_box").value;
}

function modalLoaded(){
    console.log(" Modal Loaded ");
    status = true;
    video.loop();
}

function gotresults( error , results){

    if(error){
        console.error(error);
    }
     console.log(results);
     objects=results;

}

