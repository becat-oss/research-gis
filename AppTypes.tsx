import { LatLngExpression } from "leaflet";

export type InputPointData ={
  id:string,
  coordinate:Coordinate,
  tag:string,
  description:string,
  value:number
}

//group by tag
export type GroupedInputPointData ={
  [key:string]:Set<InputPointData>
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
  geometry:PolygonGeometry|PointGeometry,
  properties:FeatureProperties,
  type:string,
  id:string,
};

export type PolygonGeometry ={
  //coordinates:number[]|number[][][],
  coordinates:number[][][][],
  type:string,
}

export type PointGeometry ={
  //coordinates:number[]|number[][][],
  coordinates:number[],
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