let noseX = 0 
let noseY = 0
let leftWristX = 0
let rightWristX = 0
let difference = 0

function setup(){
    video = createCapture(VIDEO)
    video.size(550, 500)

    canvas = createCanvas(500, 500)
    canvas.position(800, 137)

    poseNet = ml5.poseNet(video, modalLoaded)
    poseNet.on('pose', gotPoses)
}

function modalLoaded() {console.log("PoseNet is Initialized!")}

function gotPoses(results){
    if (results.length > 0){
        noseX = results[0].pose.nose.x
        noseY = results[0].pose.nose.y
        console.log("Nose X: " + noseX + " Nose Y: " + noseY)

        leftWristX = results[0].pose.leftWrist.x
        rightWristX = results[0].pose.rightWrist.x
        console.log("Left Wrist X: " + leftWristX + " Right Wrist X: " + rightWristX)

        difference = leftWristX - rightWristX
    }
}

function draw(){
    background("#1B2631")

    square(noseX, noseY, Math.floor(difference))
    fill("#F0F3F4")
    stroke("#2ECC71")

    document.querySelector("#size").innerHTML = "Size: " + Math.floor(difference) + "px"
}

