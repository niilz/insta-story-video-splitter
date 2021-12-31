// Retrieve the uploaded video
const input = document.querySelector("input");
input.addEventListener("input", displayVideo);

// Split the video when the button is pressed
const video = document.querySelector("video");

// Display the uploaded video in the video element
function displayVideo(e) {
  const videoFile = e.target.files[0];
  video.src = videoFile && window.URL.createObjectURL(videoFile);
}

const splitButton = document.querySelector("#split-button");
splitButton.addEventListener("click", splitVideo);

const download = (chunk, num) => {
  console.log("chnuk download", chunk);

  const objUrl = URL.createObjectURL(chunk);

  console.log({ chunk });

  let downloadable = document.createElement("a");
  downloadable.href = objUrl;
  const fileName = `test${num++}.webm`;
  downloadable.download = fileName;

  document.querySelector("body").appendChild(downloadable);
  downloadable.click();

  console.log("donwloadable", downloadable);

  URL.revokeObjectURL(chunk);
};

function splitVideo() {
  video.play();
  // muted="true" does not work (no bytes are recorded with muted="true")
  video.volume = 0.1;
  console.log("started video");
  const stream = video.captureStream();
  console.log("stream", stream);

  let num = 1;
  // Very first recording
  setTimeout(() => createChunk(num++, stream), 0);
  // Record the rest (after 15 seconds)
  let recordLoop = setInterval(() => {
    createChunk(num++, stream);
  }, 1500);

  // Stop the splitting and recording
  setTimeout(() => clearInterval(recordLoop), 6000);
}

function createChunk(num, stream) {
  let data = [];
  const recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (event) => data.push(event.data);

  recorder.start(1500);
  console.log("recorder started");

  recorder.onstop = (_e) => {
    download(data[0], num);
  };

  setTimeout(() => recorder.stop(), 1500);
}
