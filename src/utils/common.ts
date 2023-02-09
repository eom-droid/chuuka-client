import { IProduct } from "@/api/m1/product";
import { LINKEDLIST_HEAD } from "@/constant/constant";

export function scrollToTop() {
  if (isMobile()) {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  } else {
    let upper = setInterval(function () {
      if (document.getElementById("mainWrapper")?.scrollTop != 0) {
        document.getElementById("mainWrapper")?.scrollBy(0, -30);
      } else {
        clearInterval(upper);
      }
    });
  }
}

export function scrollDown() {
  window.scrollTo({
    top: document.body.scrollHeight, // <- 페이지 총 Height
    behavior: "smooth",
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

export function sortProductLinkedList(tempList: IProduct[]) {
  if (tempList.length === 0) {
    return [];
  }
  let copiedList: Array<IProduct> = JSON.parse(JSON.stringify(tempList));
  let result: Array<IProduct> = [];
  let index = 0;
  // head를 찾고
  const headProduct = copiedList.find(
    (ele) => ele.beforeNodeId === LINKEDLIST_HEAD
  ) as IProduct;
  // 먼저 result에 push
  result.push(headProduct);
  // 계속 돌면서 result length와 copiedList length가 같으면 종료
  while (1) {
    if (result.length === copiedList.length) break;
    // 다음 노드 찾기
    const nextNode = copiedList.find(
      (ele) => ele.beforeNodeId === result[index].id
    ) as IProduct;
    result.push(nextNode);
    index++;
  }
  return result;
}

export function changeProductOrder(
  tempList: IProduct[],
  fromIndex: string,
  toIndex: string
) {
  const from = parseInt(fromIndex);
  const to = parseInt(toIndex);
  tempList.splice(to, 0, tempList.splice(from, 1)[0]);

  if (to === 0) {
    tempList[to].beforeNodeId = LINKEDLIST_HEAD;
  } else {
    tempList[to].beforeNodeId = tempList[to - 1].id;
  }
  if (to != tempList.length - 1) {
    tempList[to + 1].beforeNodeId = tempList[to].id;
  }

  if (from === 0) {
    tempList[from].beforeNodeId = LINKEDLIST_HEAD;
  } else {
    tempList[from].beforeNodeId = tempList[from - 1].id;
  }
  if (from != tempList.length - 1) {
    tempList[from + 1].beforeNodeId = tempList[from].id;
  }
}
