export class ImageModel implements IImage {
  link: string;
  gs: string;

  constructor({ link, gs }: IImage) {
    this.link = link;
    this.gs = gs;
  }

  static fromJson(json: IImage): ImageModel {
    return new ImageModel({
      link: json.link,
      gs: json.gs,
    });
  }
  toJson(): Object {
    return {
      link: this.link,
      gs: this.gs,
    };
  }
}

interface IImage {
  link: string;
  gs: string;
}
