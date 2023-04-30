export class SnsModel implements ISns {
  public instagram?: string;
  public kakaoTalk?: string;

  constructor({ instagram, kakaoTalk }: ISns) {
    this.instagram = instagram;
    this.kakaoTalk = kakaoTalk;
  }

  static fromJson(json: ISns) {
    return new SnsModel(json);
  }
  toJson() {
    var json: ISns = {};
    if (this.instagram !== undefined) {
      json.instagram = this.instagram;
    }
    if (this.kakaoTalk !== undefined) {
      json.kakaoTalk = this.kakaoTalk;
    }
    return json;
  }
}

interface ISns {
  instagram?: string;
  kakaoTalk?: string;
}
