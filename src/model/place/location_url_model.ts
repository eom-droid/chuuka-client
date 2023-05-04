export class LocationUrlModel implements ILocationUrl {
  kakao?: string;
  naver: string;

  constructor({ kakao, naver }: ILocationUrl) {
    this.kakao = kakao;
    this.naver = naver;
  }

  static fromJson(json: ILocationUrl): LocationUrlModel {
    return new LocationUrlModel({
      kakao: json.kakao,
      naver: json.naver,
    });
  }

  toJson(): Object {
    return {
      kakao: this.kakao,
      naver: this.naver,
    };
  }
}

interface ILocationUrl {
  kakao?: string;
  naver: string;
}
