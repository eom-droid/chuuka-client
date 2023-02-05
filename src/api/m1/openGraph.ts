import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { INews } from "./news";

export interface IOpenGraph {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}
