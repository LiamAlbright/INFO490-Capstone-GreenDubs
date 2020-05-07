// Sign up at https://openweathermap.org/ to obtain an API key
//import * as tf from '@tensorflow/tfjs';
//import * as tf from '@tensorflow/tfjs-core';
let inputMin = -1;
let inputMax = 1;
let normalizationConstant = (inputMax - inputMin) / 255.0;
const IMAGE_CLASSES = ["cane","cavallo","elefante","farfalla","gallina","gatto","mucca","pecora","ragno","scoiattolo"];

async function runmodel(){




 const model = await  tf.loadLayersModel('./keras_model/modeltfjs.json');
 const imgEl = document.getElementById('img');
 const exampleimg = tf.browser.fromPixels(imgEl); 

 const normalized = exampleimg.toFloat().mul(normalizationConstant).add(inputMin);

 const resized = tf.image.resizeBilinear(
    exampleimg, [50, 50], true);

  //  const batched = resized.reshape([-1, 50, 50, 1]);
    const batched = resized.reshape([-1, 50, 50,3]);

 const prediction = model.predict(batched);

 //const classes = await getTopKClasses(prediction, 10);
 const softmax = prediction.softmax();
 const values = await softmax.data();
 console.log(values)

 //console.log(classes)


}

 runmodel();


/////// CODE FROM TENSORFLOW JS MOBILE NET THAT IM PLAYING AROUND WITH
// async function getTopKClasses(logits, topK) {
//     const softmax = logits.softmax();
//     const values = await softmax.data();
//     softmax.dispose();

//     const valuesAndIndices = [];
//     for (let i = 0; i < values.length; i++) {
//     valuesAndIndices.push({value: values[i], index: i});
//     }
//     valuesAndIndices.sort((a, b) => {
//     return b.value - a.value;
//     });
//     const topkValues = new Float32Array(topK);
//     const topkIndices = new Int32Array(topK);
//     for (let i = 0; i < topK; i++) {
//     topkValues[i] = valuesAndIndices[i].value;
//     topkIndices[i] = valuesAndIndices[i].index;
//     }

//     const topClassesAndProbs = [];
//     for (let i = 0; i < topkIndices.length; i++) {
//     topClassesAndProbs.push({
//     className: IMAGENET_CLASSES[topkIndices[i]],
//     probability: topkValues[i]
//     });
//     }
// return topClassesAndProbs;
// }

//  let net;

// async function app() {
//   console.log('Loading mobilenet..');

//   // Load the model.
//   net = await mobilenet.load();
//   console.log('Successfully loaded model');

//   // Make a prediction through the model on our image.
//   const imgEl = document.getElementById('img');
//   const result = await net.classify(imgEl);
//   console.log(result);
// }

// app();