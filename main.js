// Retrieve the uploaded video
const input = document.querySelector("input");
input.addEventListener("input", displayVideo);

// Display the uploaded video in the video element
function displayVideo(e) {
  const videoFile = e.target.files[0];
  video.src = videoFile && window.URL.createObjectURL(videoFile);
}

// Split the video when the button is pressed
const video = document.querySelector("video");
const splitButton = document.querySelector("#split-button");
splitButton.addEventListener("click", splitVideo);

function splitVideo() {
  start();
  let data = [];
}

function start() {
  const stream = video.captureStream();
  console.log("stream", stream);
  let data = [];
  const recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  console.log("recorder started");
  video.play();
  console.log("started video");

  recorder.onstop = (e) => {
    console.log("recorder stopped");
    console.log(data);
  };

  setTimeout(() => recorder.stop(), 1500);

  /*
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      preview.srcObject = stream;
      downloadButton.href = stream;
      preview.captureStream = preview.captureStream || preview.mozCaptureStream;
      return new Promise((resolve) => (preview.onplaying = resolve));
    })
    .then(() => startRecording(preview.captureStream(), recordingTimeMS))
    .then((recordedChunks) => {
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      recording.src = URL.createObjectURL(recordedBlob);
      downloadButton.href = recording.src;
      downloadButton.download = "RecordedVideo.webm";
    })
    .catch(log);
    */
}
