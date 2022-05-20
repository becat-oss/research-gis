import { LatLngExpression } from "leaflet";

export type GeoJsonData ={
  type: string,
  features:Feature[],
}

export type Feature ={
  geometry:FeatureGeometry,
  properties:FeatureProperties,
  type:string,
};

export type FeatureGeometry ={
  coordinates:number[],
  type:string,
}

export type FeatureProperties={
  Title:string,
}

export type SiteOutline = Coordinate[]

export type Coordinate ={
  lat: number,
  lng: number
}

export type GoogleMapDirection ={
  "routes":GoogleMapRoute[]
}

export type GoogleMapRoute={
  "legs":GoogleMapLeg[]
}
export type GoogleMapLeg={
  "steps":GoogleMapStep[]
}

export type GoogleMapStep={
  "end_location": LatLngExpression,
  "start_location": LatLngExpression,
}