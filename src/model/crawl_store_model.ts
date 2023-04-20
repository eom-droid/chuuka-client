export class CrawlStoreModel implements ICrawlStore {
  public sid: string;
  public name: string;
  public latitude: number;
  public longitude: number;
  public address: string;
  public storeNum: string;
  public telephone: string;
  public kakao: string;
  public instagram: string;
  public schedule: string;
  public checked: boolean;
  public isShown: boolean;

  private constructor(json: ICrawlStore) {
    this.sid = json.sid ?? "0";
    this.name = json.name ?? "";
    this.latitude = json.latitude ?? 0;
    this.longitude = json.longitude ?? 0;
    this.address = json.address ?? "";
    this.storeNum = json.storeNum ?? "";
    this.telephone = json.telephone ?? "";
    this.kakao = json.kakao ?? "";
    this.instagram = json.instagram ?? "";
    this.schedule = json.schedule ?? "";
    this.checked = json.checked ?? false;
    this.isShown = json.isShown ?? false;
  }

  static fromJson(json: ICrawlStore) {
    return new CrawlStoreModel(json);
  }
}

export interface ICrawlStore {
  sid: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  storeNum: string;
  telephone: string;
  kakao: string;
  instagram: string;
  schedule: string;
  checked: boolean;
  isShown: boolean;
}
