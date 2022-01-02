import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/public/ffmpeg-core/ffmpeg-core.js",
});

// Retrieve the uploaded video
const input = document.querySelector("input");
input.addEventListener("input", () => console.log("video file is present"));

const splitButton = document.querySelector("#split-button");
splitButton.addEventListener("click", splitVideo);

const download = () => {
  console.log("downloading chunk");

  let downloadable = document.createElement("a");
  downloadable.href = videoUrl;
  const fileName = `test.webm`;
  downloadable.download = fileName;

  document.querySelector("body").appendChild(downloadable);
  downloadable.click();

  console.log("donwloadable", downloadable);

  URL.revokeObjectURL(videoUrl);
};

const downloadButton = document.querySelector("#download-button");
downloadButton.addEventListener("click", download);

let videoUrl;
async function splitVideo() {
  await ffmpeg.load();
  console.log("loaded ffmpeg");

  const uploadedFile = input.files[0];
  console.log("got uploaded file");

  const videoFile = await fetchFile(uploadedFile);
  console.log("fetched File");

  ffmpeg.FS("writeFile", "test", videoFile);
  console.log("wrote file");

  await ffmpeg.run("-i", "test", "-ss", "0", "-t", "15", "shorter.mp4");
  console.log("Executed trimming command");

  const videoData = ffmpeg.FS("readFile", "shorter.mp4");

  const video = document.querySelector("video");
  const blob = new Blob([videoData.buffer], { type: "video/mp4" });
  videoUrl = URL.createObjectURL(blob);
  video.src = videoUrl;
}
