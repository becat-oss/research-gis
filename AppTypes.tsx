import { LatLngExpression } from "leaflet";

export type InputPointData ={
  coordinate:Coordinate,
  tag:string,
  description:string,
  value:number|string
}

//group by tag
export type GroupedInputPointData ={
  [key:string]:InputPointData[]
}

export type Layer={
  name:string,
  visible:boolean,
}

export type GeoJsonData ={
  type: string,
  features:Feature[],
}

export type Feature ={
  geometry:FeatureGeometry,
  properties:FeatureProperties,
  type:string,
  id:string,
};

export type FeatureGeometry ={
  coordinates:number[]|number[][][],
  type:string,
}

export type FeatureProperties={
  Title:string,
}

export type Attribute={
  title:string,
  description:string,
  unit:string,
  data:AttributeData,
}

export type AttributeData={
  [key:string]:number,
}

export type MinMax={
  min:number,
  max:number,
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