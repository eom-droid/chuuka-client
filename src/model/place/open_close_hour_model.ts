interface IOpenCloseHour {
  sun: OpenCloseHourDetailModel;
  mon: OpenCloseHourDetailModel;
  tue: OpenCloseHourDetailModel;
  wed: OpenCloseHourDetailModel;
  thu: OpenCloseHourDetailModel;
  fri: OpenCloseHourDetailModel;
  sat: OpenCloseHourDetailModel;
  description?: string;
}
export class OpenCloseHourModel implements IOpenCloseHour {
  sun: OpenCloseHourDetailModel;
  mon: OpenCloseHourDetailModel;
  tue: OpenCloseHourDetailModel;
  wed: OpenCloseHourDetailModel;
  thu: OpenCloseHourDetailModel;
  fri: OpenCloseHourDetailModel;
  sat: OpenCloseHourDetailModel;
  description?: string;

  constructor({
    sun,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    description,
  }: IOpenCloseHour) {
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
    return new OpenCloseHourModel({
      sun: new OpenCloseHourDetailModel({}),
      mon: new OpenCloseHourDetailModel({}),
      tue: new OpenCloseHourDetailModel({}),
      wed: new OpenCloseHourDetailModel({}),
      thu: new OpenCloseHourDetailModel({}),
      fri: new OpenCloseHourDetailModel({}),
      sat: new OpenCloseHourDetailModel({}),
    });
  }

  static fromJson(json: IOpenCloseHour): OpenCloseHourModel {
    return new OpenCloseHourModel({
      sun: OpenCloseHourDetailModel.fromJson(json.sun),
      mon: OpenCloseHourDetailModel.fromJson(json.mon),
      tue: OpenCloseHourDetailModel.fromJson(json.tue),
      wed: OpenCloseHourDetailModel.fromJson(json.wed),
      thu: OpenCloseHourDetailModel.fromJson(json.thu),
      fri: OpenCloseHourDetailModel.fromJson(json.fri),
      sat: OpenCloseHourDetailModel.fromJson(json.sat),
      description: json.description,
    });
  }

  toJson(): Object {
    return {
      sun: this.sun.toJson(),
      mon: this.mon.toJson(),
      tue: this.tue.toJson(),
      wed: this.wed.toJson(),
      thu: this.thu.toJson(),
      fri: this.fri.toJson(),
      sat: this.sat.toJson(),
      description: this.description,
    };
  }

  toJsonWithoutDescription(): string {
    return JSON.stringify({
      sun: this.sun.toJson(),
      mon: this.mon.toJson(),
      tue: this.tue.toJson(),
      wed: this.wed.toJson(),
      thu: this.thu.toJson(),
      fri: this.fri.toJson(),
      sat: this.sat.toJson(),
    });
  }
}

export class OpenCloseHourDetailModel implements IOpenCloseHourDetail {
  isClosed?: boolean;
  openHour?: string;
  closeHour?: string;
  startBreakTime?: string;
  endBreakTime?: string;
  lastOrderTime?: string;

  constructor({
    isClosed,
    openHour,
    closeHour,
    startBreakTime,
    endBreakTime,
    lastOrderTime,
  }: IOpenCloseHourDetail) {
    this.isClosed = isClosed;
    this.openHour = openHour;
    this.closeHour = closeHour;
    this.startBreakTime = startBreakTime;
    this.endBreakTime = endBreakTime;
    this.lastOrderTime = lastOrderTime;
    return this;
  }

  static fromJson(json: IOpenCloseHourDetail): OpenCloseHourDetailModel {
    return new OpenCloseHourDetailModel({
      isClosed: json.isClosed,
      openHour: json.openHour,
      closeHour: json.closeHour,
      startBreakTime: json.startBreakTime,
      endBreakTime: json.endBreakTime,
      lastOrderTime: json.lastOrderTime,
    });
  }

  toJson(): Object {
    return {
      isClosed: this.isClosed,
      openHour: this.openHour,
      closeHour: this.closeHour,
      startBreakTime: this.startBreakTime,
      endBreakTime: this.endBreakTime,
      lastOrderTime: this.lastOrderTime,
    };
  }
}

interface IOpenCloseHourDetail {
  isClosed?: boolean;
  openHour?: string;
  closeHour?: string;
  startBreakTime?: string;
  endBreakTime?: string;
  lastOrderTime?: string;
}
