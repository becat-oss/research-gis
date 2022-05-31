import React from "react";
import { LatLngExpression } from "leaflet";
import { FeatureGroup, Polygon, Popup } from "react-leaflet";
import { Attribute, Feature } from "../../AppTypes";

interface PathOption {
  color: string;
}
interface Props{
  polygon:LatLngExpression[],
  pathOption:PathOption,
}

export function PolygonFeature({polygon,pathOption}:Props):React.ReactElement{
  
  return(
    <Polygon pathOptions={pathOption} positions={polygon}/>
  )
}