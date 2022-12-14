// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/sw.js", { scope: "/" });
//   });
// }
self.addEventListener("install", function (event) {
  console.log("install.");
});
