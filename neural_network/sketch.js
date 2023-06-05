let model;
let targetLabel = 'C';
let program_state = 'collection';

function setup() {
    createCanvas(500, 500);

    // Neural network configuration
    let options = {
        inputs: ['x', 'y'],
        outputs: ['label'],
        task: 'classification',
        debug: 'true'
    }

    // Initializing the model 
    model = ml5.neuralNetwork(options);
    background(255);
}

function whileTraining(epoch, loss) {
    console.log(epoch)
}

function finishedTraining() {
    console.log('Finished training! Click anywhere on the JS canvas to generate a prediction.')
    program_state = 'prediction';
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
    stroke(0);
    fill(0, 0, 255, 100);
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(results[0].label, mouseX, mouseY);
}

function keyPressed() {
    if (program_state == 'collection') {
        if (key == 'Enter') {
            program_state = 'training';
            console.log("Training model...")
            model.normalizeData();
            
            let options = {
                epochs: 200
            }
    
            model.train(options, whileTraining, finishedTraining);
            targetLabel = 'C'
        }
        else {
            targetLabel = key.toUpperCase();
        }
    }
}

function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    }

    if (program_state == 'collection') {
        let target = {
            label: targetLabel 
        }
        // Adding the training data to the model
        model.addData(inputs, target)
        
        stroke(0);
        noFill();
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(targetLabel, mouseX, mouseY);
    }
    else if (program_state == 'prediction') {
        console.log('Prediction:')
        model.classify(inputs, gotResults);
    }
} 