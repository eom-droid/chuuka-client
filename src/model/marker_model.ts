import { GeoPoint, Timestamp } from "firebase/firestore";
import { OpenCloseHourModel } from "@/model/place/open_close_hour_model";

export class MarkersWithUpdateTimeModel implements IMarkersWithUpdateTime {
  markers: Array<MarkerModel>;
  articleMarkers: Array<MarkerArticleModel>;
  modDTime: Timestamp;

  constructor({ markers, articleMarkers, modDTime }: IMarkersWithUpdateTime) {
    this.markers = markers;
    this.articleMarkers = articleMarkers;
    this.modDTime = modDTime;
  }

  static fromJson(json: IMarkersWithUpdateTime): MarkersWithUpdateTimeModel {
    return new MarkersWithUpdateTimeModel({
      markers: json.markers.map((marker) => MarkerModel.fromJson(marker)),
      articleMarkers: json.articleMarkers.map((marker) =>
        MarkerArticleModel.fromJson(marker)
      ),
      modDTime: json.modDTime,
    });
  }

  toJson(): Object {
    return {
      markers: this.markers.map((marker) => marker.toJson()),
      articleMarkers: this.articleMarkers.map((marker) => marker.toJson()),
      modDTime: this.modDTime,
    };
  }
}

export interface IMarkersWithUpdateTime {
  markers: Array<MarkerModel>;
  articleMarkers: Array<MarkerArticleModel>;
  modDTime: Timestamp;
}

interface IMarkerBase {
  placeId: string;
  geoCoord: GeoPoint;
  category: string;
}
export class MarkerBaseModel implements IMarkerBase {
  placeId: string;
  geoCoord: GeoPoint;
  category: string;

  constructor({ placeId, geoCoord, category }: IMarkerBase) {
    this.placeId = placeId;
    this.geoCoord = geoCoord;
    this.category = category;
  }

  static fromJson(json: IMarkerBase): MarkerBaseModel {
    return new MarkerBaseModel(json);
  }

  toJson(): Object {
    return {
      placeId: this.placeId,
      geoCoord: this.geoCoord,
      category: this.category,
    };
  }
}

export class MarkerModel extends MarkerBaseModel implements IMarker {
  openCloseHours: OpenCloseHourModel;

  constructor({ placeId, geoCoord, category, openCloseHours }: IMarker) {
    super({ placeId, geoCoord, category });
    this.openCloseHours = openCloseHours;
  }

  static fromJson(json: IMarker): MarkerModel {
    return new MarkerModel({
      placeId: json.placeId,
      geoCoord: json.geoCoord,
      category: json.category,
      openCloseHours: OpenCloseHourModel.fromJson(json.openCloseHours),
    });
  }

  toJson(): Object {
    return {
      placeId: this.placeId,
      geoCoord: this.geoCoord,
      category: this.category,
      openCloseHours: this.openCloseHours.toJson(),
    };
  }
}

export interface IMarker extends IMarkerBase {
  openCloseHours: OpenCloseHourModel;
}

interface IMarkerArticle extends IMarkerBase {
  articleId: string;
}

export class MarkerArticleModel
  extends MarkerBaseModel
  implements IMarkerArticle
{
  articleId: string;

  constructor({ placeId, geoCoord, category, articleId }: IMarkerArticle) {
    super({ placeId, geoCoord, category });
    this.articleId = articleId;
  }

  static fromJson(json: IMarkerArticle): MarkerArticleModel {
    return new MarkerArticleModel({
      placeId: json.placeId,
      geoCoord: json.geoCoord,
      category: json.category,
      articleId: json.articleId,
    });
  }

  toJson(): Object {
    return {
      placeId: this.placeId,
      geoCoord: this.geoCoord,
      category: this.category,
      articleId: this.articleId,
    };
  }
}
