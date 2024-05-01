const image = document.getElementById("myImage");
const container = document.getElementById("container");

container.addEventListener("click", (event) => {
  const clickX = event.clientX; // Get mouse click X coordinate
  const clickY = event.clientY; // Get mouse click Y coordinate

  // Animate the image directly to the click position (no offset):
  animateMovement(image, clickX, clickY);
});

function animateMovement(image, targetLeft, targetTop) {
  const currentLeft = image.offsetLeft; // Get current left position
  const currentTop = image.offsetTop; // Get current top position

  const deltaLeft = targetLeft - currentLeft; // Calculate movement difference (left)
  const deltaTop = targetTop - currentTop; // Calculate movement difference (top)

  const animationDuration = 500; // Adjust duration for desired animation speed (ms)

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
