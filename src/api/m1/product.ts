import {
  getDocs,
  collection,
  query,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { firebaseDevPath } from "../tempdev";
import { IPhoto } from "./photo";

// export interface IProduct {
//   id: string;
//   name: string;
//   photos: Array<IProductPhoto>;
//   hashTags: Array<string>;
//   optionGroups: Array<IOptionGroup>;
//   isEmergency: boolean;
//   isSoldOut: boolean;
//   isHidden: boolean;
//   regDtime: Timestamp;
//   modDtime: Timestamp;
// }
export interface IProduct {
  id: string;
  name: string;
  description: string;
  photos: Array<IPhoto>;
  hashTags: Array<string>;
  isSoldOut: boolean;
  isHidden: boolean;
  regDtime: Timestamp;
  modDtime: Timestamp;
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

export async function addProduct(storeId: string, product: IProduct) {
  const nowDTime = Timestamp.fromDate(new Date());
  product.modDtime = nowDTime;
  product.regDtime = nowDTime;
  product = removeId(product);
  let id = "";
  await addDoc(
    collection(firestore, firebaseDevPath + "store/" + storeId + "/product"),
    product
  ).then(function (docRef) {
    id = docRef.id;
  });
  return id;
}
export async function updateProduct(storeId: string, product: IProduct) {
  const nowDTime = Timestamp.fromDate(new Date());
  const id = product.id;
  product.modDtime = nowDTime;
  product = removeId(product);
  await updateDoc(
    doc(firestore, firebaseDevPath + "store/" + storeId + "/product", id),
    {
      modDtime: product.modDtime,
      name: product.name,
      description: product.description,
      hashTags: product.hashTags,
      photos: product.photos,
      isHidden: product.isHidden,
      isSoldOut: product.isSoldOut,
    }
  );
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
export function getProductById(id: string, productList: Array<IProduct>) {
  return productList.find((ele) => ele.id === id);
}

export async function deleteProduct(
  storeId: string,
  productId: string
): Promise<boolean> {
  await deleteDoc(
    doc(firestore, firebaseDevPath + "store/" + storeId + "/product", productId)
  );
  return true;
}

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
