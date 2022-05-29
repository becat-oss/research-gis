import React from "react";
import { FeatureGroup, Polygon, Popup } from "react-leaflet";
import { Attribute, Feature } from "../../AppTypes";

interface PathOption {
  color: string;
}
interface Props{
  polygon:number[],
  pathOption:PathOption,
}

export function PolygonFeature({polygon,pathOption}:Props):React.ReactElement{
  
  return(
    <Polygon pathOptions={pathOption} positions={polygon}/>
  )
}