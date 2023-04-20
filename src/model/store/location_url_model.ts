export class LocationUrlModel implements ILocationUrl {
  public kakao?: string;
  public naver: string;

  constructor({ kakao, naver }: ILocationUrl) {
    this.kakao = kakao;
    this.naver = naver;
  }

  static fromJson(json: ILocationUrl) {
    return new LocationUrlModel(json);
  }

  toJson() {
    let json: ILocationUrl = {
      naver: this.naver,
    };
    if (this.kakao !== undefined) {
      json.kakao = this.kakao;
    }
    return json;
  }
}

interface ILocationUrl {
  kakao?: string;
  naver: string;
}
