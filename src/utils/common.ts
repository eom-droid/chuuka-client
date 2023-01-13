export function scrollUp() {
  const tempIsMobile = isMobile();
  let upper = setInterval(function () {
    if (tempIsMobile) {
      if (document.documentElement.scrollTop != 0) {
        window.scrollBy(0, -30);
      } else {
        clearInterval(upper);
      }
    } else {
      if (document.getElementById("mainWrapper")?.scrollTop != 0) {
        document.getElementById("mainWrapper")?.scrollBy(0, -30);
      } else {
        clearInterval(upper);
      }
    }
  });
}

function isMobile() {
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}
