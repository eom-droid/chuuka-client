import {
  getDocs,
  collection,
  query,
  Timestamp,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { firebaseDevPath } from "../tempdev";
import { IPhoto } from "./photo";
import { firestore } from "@/plugins/firebase";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  photos: Array<IPhoto>;
  order: number;
  // hashTags: Array<string>;

  sameDayOrderAble: boolean;
  sizeChangeAble: boolean;
  designChangeAble: boolean;

  modUser: string;
  regDtime: Timestamp;
  modDtime: Timestamp;

  beforeNodeId: string;
}
export interface IOptionGroup {
  name: string;
  options: Array<IOption>;
  regDtime: Timestamp;
  modDtime: Timestamp;
  isEssential: boolean;
}
export interface IOption {
  amount: number;
  name: string;
  IsSoldOut: boolean;
  sequence: number;
}

export async function getAllProduct(storeId: string): Promise<Array<IProduct>> {
  let result = [] as Array<IProduct>;
  const q = query(
    collection(firestore, firebaseDevPath + "store/" + storeId + "/product")
  );
  const snapShot = await getDocs(q);
  snapShot.docs.map((ele) => {
    let data = ele.data() as IProduct;
    data.id = ele.id;
    result.push(data);
  });
  return result;
}

export async function getProductById(
  storeId: string,
  productId: string
): Promise<IProduct> {
  let result = {} as IProduct;
  const snapShot = await getDoc(
    doc(firestore, firebaseDevPath + "store/" + storeId + "/product", productId)
  );
  result = snapShot.data() as IProduct;
  result.id = snapShot.id;
  return result;
}
// export function getProductById(id: string, productList: Array<IProduct>) {
//   return productList.find((ele) => ele.id === id);
// }

export function snapShotProduct(storeId: string, func: Function) {
  return onSnapshot(
    collection(firestore, firebaseDevPath + "store/" + storeId + "/product"),
    (snapShot) => {
      func(snapShot.docs);
    }
  );
}

function removeId(storeInfo: IProduct): any {
  let { id, ...storeInfoRmId } = storeInfo;
  return storeInfoRmId;
}
