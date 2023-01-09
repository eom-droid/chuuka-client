export function scrollUp() {
  let upper = setInterval(function () {
    if (document.documentElement.scrollTop != 0) {
      window.scrollBy(0, -30);
    } else {
      clearInterval(upper);
    }
  });
}
