import { OpenCloseHourModel } from "@/model/store/open_close_hour_model";

export class OpenCloseHoursModel implements IOpenCloseHours {
  public sun: OpenCloseHourModel;
  public mon: OpenCloseHourModel;
  public tue: OpenCloseHourModel;
  public wed: OpenCloseHourModel;
  public thu: OpenCloseHourModel;
  public fri: OpenCloseHourModel;
  public sat: OpenCloseHourModel;
  public description?: string;

  constructor({
    sun,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    description,
  }: IOpenCloseHours) {
    this.sun = sun;
    this.mon = mon;
    this.tue = tue;
    this.wed = wed;
    this.thu = thu;
    this.fri = fri;
    this.sat = sat;
    this.description = description;
  }

  static initEmpty() {
    return new OpenCloseHoursModel({
      sun: new OpenCloseHourModel({}),
      mon: new OpenCloseHourModel({}),
      tue: new OpenCloseHourModel({}),
      wed: new OpenCloseHourModel({}),
      thu: new OpenCloseHourModel({}),
      fri: new OpenCloseHourModel({}),
      sat: new OpenCloseHourModel({}),
    });
  }

  static fromJson(json: IOpenCloseHours) {
    return new OpenCloseHoursModel({
      sun: OpenCloseHourModel.fromJson(json.sun),
      mon: OpenCloseHourModel.fromJson(json.mon),
      tue: OpenCloseHourModel.fromJson(json.tue),
      wed: OpenCloseHourModel.fromJson(json.wed),
      thu: OpenCloseHourModel.fromJson(json.thu),
      fri: OpenCloseHourModel.fromJson(json.fri),
      sat: OpenCloseHourModel.fromJson(json.sat),
      description: json.description,
    });
  }

  toJson() {
    const result = {
      sun: this.sun.toJson(),
      mon: this.mon.toJson(),
      tue: this.tue.toJson(),
      wed: this.wed.toJson(),
      thu: this.thu.toJson(),
      fri: this.fri.toJson(),
      sat: this.sat.toJson(),
    } as IOpenCloseHours;

    if (this.description) {
      result.description = this.description;
    }
    return result;
  }

  toJsonDescriptionDelete(): Object {
    return {
      sun: this.sun.toJson(),
      mon: this.mon.toJson(),
      tue: this.tue.toJson(),
      wed: this.wed.toJson(),
      thu: this.thu.toJson(),
      fri: this.fri.toJson(),
      sat: this.sat.toJson(),
    };
  }
}

export interface IOpenCloseHours {
  sun: OpenCloseHourModel;
  mon: OpenCloseHourModel;
  tue: OpenCloseHourModel;
  wed: OpenCloseHourModel;
  thu: OpenCloseHourModel;
  fri: OpenCloseHourModel;
  sat: OpenCloseHourModel;
  description?: string;
}
