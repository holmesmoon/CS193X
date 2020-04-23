window.updateSocket = io();

updateSocket.on("cssChange", path => {
  let timestamp = new Date().getTime();
  let links = document.querySelectorAll("link[rel=stylesheet]");
  for (const link of links) {
    link.href = link.href.replace(/(\?.*)?$/, `?t=${timestamp}`);
  }
});

updateSocket.on("reload", () => {
  window.location.reload();
});
