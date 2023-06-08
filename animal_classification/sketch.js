let img_loaded = false;
let model_loaded = false;
let mobilenet;
let drop_zone;
let label;
let img;

function modelReady() {
    model_loaded = true;
}

function highlight() {
    drop_zone.style('background-color', '#ccc');
}

function unhighlight() {
    drop_zone.style('background-color', '#fff');
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        label = 'LABEL: ' + results[0].label + ', CONFIDENCE: ' + results[0].confidence;
        createP(label);
    }
}

function imageReady() {
    background(255);
    img_loaded = true;
    mobilenet.predict(img, gotResults);
}

function readFile(file) {
    img = createImg(file.data, imageReady);
    img.hide();
}

function setup() {
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);

    fill(0);
    createCanvas(600, 500);

    drop_zone = select('#dropzone');
    drop_zone.dragOver(highlight);
    drop_zone.dragLeave(unhighlight);
    drop_zone.drop(readFile, unhighlight);
}

function draw() {
    background(255);
    if (!img_loaded) {
        if (model_loaded) {
            fill(0, 200, 0);
            textSize(40);
            textAlign(CENTER, CENTER);
            text("The model is now\nready to use!", width / 2, height / 2);
        } else {
            fill(200, 0, 0);
            textSize(40);
            textAlign(CENTER, CENTER);
            text("Please wait while\nthe model is loading...", width / 2, height / 2);
        }

    }
    else {
        image(img, 0, 0, width, height);
        fill(0);
        textSize(40);
        textAlign(CENTER, CENTER);
    }
}
