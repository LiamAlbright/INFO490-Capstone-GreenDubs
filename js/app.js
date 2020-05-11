// Sign up at https://openweathermap.org/ to obtain an API key
//import * as tf from '@tensorflow/tfjs';
//import * as tf from '@tensorflow/tfjs-core';
var track = document.getElementById("upload");
track.addEventListener("change", handleFiles, false);
var subBut = document.getElementById("submitImg");
var  fileList;
var imgEl = document.getElementById('img');
var tagBox = document.getElementById("checkTagBox");
// Create an unordered list
var list = document.getElementById('headerList');
let net;

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgToId = imgEl;
  const result = await net.classify(imgToId);
  console.log(result);
  myFunction(result)
}
 //


 function handleFiles() {
  fileList = this.files;
  console.log("Upload", fileList);
  track.style.background = "url('https://cdn2.iconfinder.com/data/icons/font-awesome/1792/upload-512.png') center center no-repeat cornsilk";
  track.style.backgroundSize = "40px";
  if (fileList[0].type !== "image/png" && fileList[0].type !== "image/jpeg") {
      alert("Please retry and upload a image file. Of type png or jpg!");
      track.value = "";
  } else if (fileList[0].size > 5100000) {
      alert("Image file too big. We recommend to use mp3 file less than 5MB.");
      track.value = "";
  } else {
      console.log("Accept");
      track.style.background = "url('https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png')  center center no-repeat cornsilk";
      track.style.backgroundSize = "40px";
  }
}

subBut.addEventListener("click", function (e) {
  e.preventDefault();
    if (fileList == null) {
        alert("Please upload a image before you try tagging");
    } else {
      console.log(fileList[0].name);
      imgEl.src = URL.createObjectURL(fileList[0]);
      app();
    } 
});

function myFunction(res) {
  if (res != null){
    tagBox.style.display = "block";
  } else {
    tagBox.style.display = "none";
  }
  console.log(res);




// Create a fragement
var fragment = document.createDocumentFragment();

// Create a list item for each wizard
// and append it to the fragment
res.forEach(function (res) {
	var li = document.createElement('li');
	li.textContent = res.className;
	fragment.appendChild(li);
});

// Append the fragement to the list
list.appendChild(fragment);


}
