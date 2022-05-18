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