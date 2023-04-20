export class OpenCloseHourModel implements IOpenCloseHour {
  public isClosed?: boolean;
  public openHour?: string;
  public closeHour?: string;
  public startBreakTime?: string;
  public endBreakTime?: string;
  public lastOrderTime?: string;

  constructor({
    isClosed,
    openHour,
    closeHour,
    startBreakTime,
    endBreakTime,
    lastOrderTime,
  }: IOpenCloseHour) {
    this.isClosed = isClosed;
    this.openHour = openHour;
    this.closeHour = closeHour;
    this.startBreakTime = startBreakTime;
    this.endBreakTime = endBreakTime;
    this.lastOrderTime = lastOrderTime;
    return this;
  }

  static fromJson(json: IOpenCloseHour) {
    return new OpenCloseHourModel(json);
  }

  toJson() {
    var json: IOpenCloseHour = {};
    if (this.isClosed !== undefined) {
      json.isClosed = this.isClosed;
    }
    if (this.openHour !== undefined) {
      json.openHour = this.openHour;
    }
    if (this.closeHour !== undefined) {
      json.closeHour = this.closeHour;
    }
    if (this.startBreakTime !== undefined) {
      json.startBreakTime = this.startBreakTime;
    }
    if (this.endBreakTime !== undefined) {
      json.endBreakTime = this.endBreakTime;
    }
    if (this.lastOrderTime !== undefined) {
      json.lastOrderTime = this.lastOrderTime;
    }

    return json;
  }
}

interface IOpenCloseHour {
  isClosed?: boolean;
  openHour?: string;
  closeHour?: string;
  startBreakTime?: string;
  endBreakTime?: string;
  lastOrderTime?: string;
}
