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

async function splitVideo() {
  const stream = video.captureStream();
  console.log("stream", stream);
  let data = [];
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  console.log("recorder started");
  video.play();
  console.log("started video");

  recorder.onstop = async (e) => {
    console.log("recorder stopped");
  };

  const downloadLoop = setInterval(() => download(data), 1500);
  setTimeout(() => clearInterval(downloadLoop), 3000);

  recorder.stop();
}

function download(data) {
  console.log("data", data);

  const objUrl = URL.createObjectURL(data[0]);

  let downloadable = document.createElement("a");
  downloadable.href = objUrl;
  downloadable.download = "test.webm";
  downloadable.click();

  URL.revokeObjectURL(data[0]);
}
