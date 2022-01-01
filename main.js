// Retrieve the uploaded video
const input = document.querySelector("input");
input.addEventListener("input", displayVideo);

// Split the video when the button is pressed
const video = document.querySelector("video");

// Display ms from slider
const lengthSlider = document.querySelector("#length");
const lenghtDisplay = document.querySelector("#length-display");
let length = lengthSlider.value;
const updateLength = (lenString) => {
  length = lenString;
  lenghtDisplay.innerHTML = length;
};
lengthSlider.addEventListener("change", (e) => updateLength(e.target.value));
lengthSlider.addEventListener("mousemove", (e) => updateLength(e.target.value));

// Display the uploaded video in the video element
function displayVideo(e) {
  const videoFile = e.target.files[0];
  video.src = videoFile && window.URL.createObjectURL(videoFile);
}

const splitButton = document.querySelector("#split-button");
splitButton.addEventListener("click", splitVideo);

const download = (blob, num) => {
  console.log("chunk download", blob);

  const objUrl = URL.createObjectURL(blob);

  console.log({ chunk: blob });

  let downloadable = document.createElement("a");
  downloadable.href = objUrl;
  const fileName = `test${num++}.webm`;
  downloadable.download = fileName;

  document.querySelector("body").appendChild(downloadable);
  downloadable.click();

  console.log("donwloadable", downloadable);

  URL.revokeObjectURL(blob);
};

const fifteenSeconds = 15000; //1500;

const createChunk = (num, video, stream) => {
  let data = [];
  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm;codecs=vp8,opus",
  });

  recorder.ondataavailable = (event) => {
    console.log("data", data);
    data.push(event.data);
  };

  recorder.onstop = (_e) => {
    video.pause();
    let blob = new Blob(data, { type: "video/webm" });
    console.log({ data });
    download(blob, num);
  };

  video.play();
  console.log("started video");

  recorder.start(500);
  console.log("recorder started");

  // Stop the splitting and recording
  setTimeout(() => recorder.stop(), fifteenSeconds);
};

function splitVideo() {
  const stream = video.captureStream();

  // muted="true" does not work (no bytes are recorded with muted="true")
  video.volume = 0.1;

  const recordingLength = parseInt(length);
  let num = 1;

  createChunk(num++, video, stream);
}
