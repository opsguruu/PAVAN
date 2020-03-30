// References to all the element we will need.
var video = document.querySelector('#camera-stream'),
    image = document.querySelector('#snap'),
    start_camera = document.querySelector('#start-camera'),
    controls = document.querySelector('.controls'),
    take_photo_btn = document.querySelector('#take-photo'),
    delete_photo_btn = document.querySelector('#delete-photo'),
    download_photo_btn = document.querySelector('#download-photo'),
    error_message = document.querySelector('#error-message'),
    emotions = document.querySelector('#emotions'),
    emotion_name = document.querySelector('#emotion-name'),
    loader = document.querySelector("#loader"),
    camera_icon = '<i class="material-icons">camera_alt</i>',
    file_download = '<i class="material-icons">file_download</i>',
    file_upload = '<i class="material-icons">file_upload</i>';

var randomEmotion;

// The getUserMedia interface is used for handling camera input.
// Some browsers need a prefix so here we're covering all the options
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);


if(!navigator.getMedia){
  displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
}
else{

  // Request the camera.
  navigator.getMedia(
    {
      video: { facingMode: 'user', mirrored: true }
    },
    // Success Callback
    function(stream){

      // Create an object URL for the video stream and
      // set it as src of our HTLM video element.
      //video.src = window.URL.createObjectURL(stream);
      video.srcObject = stream;

      // Play the video element to start the stream.
      video.play();
      video.onplay = function() {
        showVideo();
      };

    },
    // Error Callback
    function(err){
      displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
    }
  );

}



// Mobile browsers cannot play video without user input,
// so here we're using a button to start it manually.
start_camera.addEventListener("click", function(e){

  e.preventDefault();

  // Start video playback manually.
  video.play();
  showVideo();

});


take_photo_btn.addEventListener("click", function(e){

  e.preventDefault();
  

  if(this.firstElementChild.textContent.trim() == 'camera_alt'){

    var snap = takeSnapshot();

    // Show image. 
    image.setAttribute('src', snap);
    image.classList.add("visible");

    // Enable delete and save buttons
    delete_photo_btn.classList.remove("disabled");
    download_photo_btn.classList.remove("disabled");

    this.innerHTML = file_upload;

    // Set the href attribute of the download button to the snap url.
    download_photo_btn.href = snap;

    // Pause video playback of stream.
    video.pause();    
  }

  else {

    const base64 = image.src;

    b64_image = base64.replace(/^data:image\/(png|jpg);base64,/, "");
    postData = {"Emotion": randomEmotion, "EmotionImage": b64_image};

    const API_URL = 'https://gsazbu8adi.execute-api.ap-south-1.amazonaws.com/live/face';

    loader.style.display = "block";
    fetch(API_URL, {
      mode: 'no-cors',      
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
   .then(res => {
      loader.style.display = "none";
      delete_photo_btn.dispatchEvent(new Event('click', { 'bubbles': true }));
    })
   .catch((error) => {
      loader.style.display = "none";
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

});


delete_photo_btn.addEventListener("click", function(e){

  e.preventDefault();

  // Hide image.
  image.setAttribute('src', "");
  image.classList.remove("visible");

  // Disable delete and save buttons
  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");

  take_photo_btn.innerHTML = camera_icon;

  // Resume playback of stream.
  video.play();

  const EmotionsList =  Object.keys(Emotions);
  const index = EmotionsList.indexOf(randomEmotion);
  if (index > -1) {
    EmotionsList.splice(index, 1);
  }
  randomEmotion = randomItem(EmotionsList);
  emotions.src = randomItem(Emotions[randomEmotion]);
  emotion_name.innerText = randomEmotion;
  //console.log(randomEmotion);

});



function showVideo(){
  // Display the video stream and the controls.

  hideUI();
  video.classList.add("visible");
  controls.classList.add("visible");
}


function takeSnapshot(){
  // Here we're using a trick that involves a hidden canvas element.  

  var hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');

  var width = video.videoWidth,
      height = video.videoHeight;

  if (width && height) {

    // Setup a canvas with the same dimensions as the video.
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    context.translate(width, 0);
    context.scale(-1, 1);

    // Make a copy of the current frame in the video on the canvas.
    context.drawImage(video, 0, 0, width, height);

    // Turn the canvas image into a dataURL that can be used as a src for our photo.
    return hidden_canvas.toDataURL('image/png');
  }
}


function displayErrorMessage(error_msg, error){
  error = error || "";
  if(error){
    console.log(error);
  }

  error_message.innerText = error_msg;

  hideUI();
  error_message.classList.add("visible");
}


function hideUI(){
  // Helper function for clearing the app UI.

  controls.classList.remove("visible");
  start_camera.classList.remove("visible");
  video.classList.remove("visible");
  snap.classList.remove("visible");
  error_message.classList.remove("visible");
}

var randomItem = function (arrayObj) {
    return arrayObj[ arrayObj.length * Math.random() << 0 ]
};

randomEmotion = randomItem(Object.keys(Emotions));
emotions.src = randomItem(Emotions[randomEmotion]);
emotion_name.innerText = randomEmotion;