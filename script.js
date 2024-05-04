const image = document.getElementById("myImage");
const container = document.getElementById("container");

let isFacingRight = false;

container.addEventListener("click", (event) => {
  const clickX = event.clientX;
  const imageRect = image.getBoundingClientRect();
  const imageCenterX = imageRect.left + imageRect.width / 2;

  if (clickX < imageCenterX && isFacingRight) {
    flipImage();
    isFacingRight = false;
  } else if (clickX >= imageCenterX && !isFacingRight) {
    flipImage();
    isFacingRight = true;
  }

  animateMovement(image, event.clientX, event.clientY);
});

function flipImage() {
  image.style.transform = isFacingRight ? "scaleX(1)" : "scaleX(-1)";
}

function animateMovement(image, targetLeft, targetTop) {
  const currentLeft = image.offsetLeft;
  const currentTop = image.offsetTop;
  const deltaLeft = targetLeft - currentLeft;
  const deltaTop = targetTop - currentTop;
  const animationDuration = 500;

  let startTime = null;

  const animate = (timestamp) => {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsedTime = timestamp - startTime;
    const progress = elapsedTime / animationDuration;

    image.style.left = `${currentLeft + deltaLeft * progress}px`;
    image.style.top = `${currentTop + deltaTop * progress}px`;

    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
}
