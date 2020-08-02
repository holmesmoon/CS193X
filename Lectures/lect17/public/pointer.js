const main = () => {
  let container = document.querySelector(".container");
  let box = document.querySelector(".box");

  let origin = null;
  box.addEventListener("pointerdown", (event) => {
    let [x, y] = [event.clientX, event.clientY];
    origin = [x, y];
    box.setPointerCapture(event.pointerId);
  });
  box.addEventListener("pointerup", (event) => {
    let x = event.clientX - origin[0];
    if (x > 100) {
      alert("swipe right");
    } else if (x < -100) {
      alert("swipe left");
    }
    box.style.transform = "";
    origin = null;
  });
  box.addEventListener("pointermove", (event) => {
    if (!origin) return;
    let deltaX = event.clientX - origin[0];
    let deltaY = event.clientY - origin[1];
    //box.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    box.style.transform = `translateX(${deltaX}px)`;
  });
};
main();
