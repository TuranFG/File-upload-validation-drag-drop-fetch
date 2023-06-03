const dropArea = document.querySelector(".drag-area");
const preview = document.getElementById("preview");
const input = document.getElementById("form");

dropArea.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", (e) => {
  e.preventDefault();

  const files = e.target.files;
  handleFiles(files);
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("active");
  const files = event.dataTransfer.files;
  input.files = files;
  handleFiles(files);
});

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop().toLowerCase();
    if (["png", "jpeg", "jpg"].includes(ext)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        const image = new Image(100, 70);
        image.src = reader.result;

        const fileInfo = document.createElement("div");
        fileInfo.classList.add("imgData");
        fileInfo.innerHTML = `
          <div> <p>Image Name: ${file.name}</p>
          <p>File Type: ${ext}</p>
          <p>File Size: ${file.size} bytes</p> </div>
          <div><button type="button" class="delete-btn"><i class="fa-solid fa-x fa-xl" style="color: #e92f2f;"></i></button><div>
        `;

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imgArea");
        imageContainer.appendChild(image);
        imageContainer.appendChild(fileInfo);
        preview.appendChild(imageContainer);

        const deleteButton = imageContainer.querySelector(".delete-btn");
        deleteButton.addEventListener("click", handleDelete);

        function handleDelete() {
          imageContainer.remove();
        }
      });
    } else {
      alert("This file type is not allowed.");
    }
  }
}

const uploadButton = document.getElementById("upload");

uploadButton.addEventListener("click", () => {
  const images = document.querySelectorAll(".imgArea");
  if (images.length > 0) {
    alert("Files are uploaded");
    preview.innerHTML = "";
  } else {
    alert("Please browse a file");
  }
});