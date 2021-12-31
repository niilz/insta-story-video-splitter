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

function splitVideo() {
  video.play();
  console.log("started video");

  let i = 1;

  const splitLoop = setInterval(() => {
    const stream = video.captureStream();
    console.log("stream", stream);

    let data = [];
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => data.push(event.data);

    recorder.start();
    console.log("recorder started");

    recorder.onstop = (_e) => {
      download(data, i++);
    };

    setTimeout(() => recorder.stop(), 3000);
  }, 3000);

  setTimeout(() => clearInterval(splitLoop), 10000);

  const download = (data, num) => {
    console.log(num);
    console.log("data download", data);

    const objUrl = URL.createObjectURL(data[0]);

    let downloadable = document.createElement("a");
    downloadable.href = objUrl;
    const fileName = `test${num}.webm`;
    downloadable.download = fileName;

    document.querySelector("body").appendChild(downloadable);
    downloadable.innerHTML = fileName;
    downloadable.click();

    console.log("donwloadable", downloadable);

    URL.revokeObjectURL(data[0]);
  };
}
